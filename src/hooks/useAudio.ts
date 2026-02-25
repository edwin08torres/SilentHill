import { useRef, useCallback, useState } from "react";

interface AudioNodes {
    ctx: AudioContext;
    masterGain: GainNode;
    noiseSource: AudioBufferSourceNode | null;
    droneOsc: OscillatorNode | null;
    droneOsc2: OscillatorNode | null;
}

function createPinkNoise(ctx: AudioContext): AudioBuffer {
    const bufferSize = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
        b6 = white * 0.115926;
    }
    return buffer;
}

export function useAudio() {
    const nodesRef = useRef<AudioNodes | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const start = useCallback(() => {
        if (nodesRef.current) return;

        const ctx = new AudioContext();
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0, ctx.currentTime);
        masterGain.gain.linearRampToValueAtTime(1, ctx.currentTime + 2);
        masterGain.connect(ctx.destination);

        const noiseBuffer = createPinkNoise(ctx);
        const noiseSource = ctx.createBufferSource();
        noiseSource.buffer = noiseBuffer;
        noiseSource.loop = true;

        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = "bandpass";
        noiseFilter.frequency.value = 800;
        noiseFilter.Q.value = 0.3;

        const noiseGain = ctx.createGain();
        noiseGain.gain.value = 0.07;

        noiseSource.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(masterGain);
        noiseSource.start();

        const droneOsc = ctx.createOscillator();
        droneOsc.type = "sine";
        droneOsc.frequency.value = 55;

        const droneOsc2 = ctx.createOscillator();
        droneOsc2.type = "sine";
        droneOsc2.frequency.value = 58.5;

        const droneGain = ctx.createGain();
        droneGain.gain.value = 0.18;

        const droneGain2 = ctx.createGain();
        droneGain2.gain.value = 0.12;

        droneOsc.connect(droneGain);
        droneGain.connect(masterGain);
        droneOsc2.connect(droneGain2);
        droneGain2.connect(masterGain);

        droneOsc.start();
        droneOsc2.start();

        nodesRef.current = { ctx, masterGain, noiseSource, droneOsc, droneOsc2 };
        setIsPlaying(true);
    }, []);

    const stop = useCallback(() => {
        const nodes = nodesRef.current;
        if (!nodes) return;

        const { ctx, masterGain } = nodes;
        masterGain.gain.setValueAtTime(masterGain.gain.value, ctx.currentTime);
        masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);

        setTimeout(() => {
            nodes.noiseSource?.stop();
            nodes.droneOsc?.stop();
            nodes.droneOsc2?.stop();
            ctx.close();
            nodesRef.current = null;
        }, 1600);

        setIsPlaying(false);
    }, []);

    const toggle = useCallback(() => {
        if (isPlaying) stop();
        else start();
    }, [isPlaying, start, stop]);

    const playHover = useCallback(() => {
        const nodes = nodesRef.current;
        if (!nodes) return;
        const { ctx } = nodes;

        const buf = ctx.createBuffer(1, ctx.sampleRate * 0.06, ctx.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1);

        const src = ctx.createBufferSource();
        src.buffer = buf;

        const filt = ctx.createBiquadFilter();
        filt.type = "bandpass";
        filt.frequency.value = 2400;
        filt.Q.value = 1.2;

        const g = ctx.createGain();
        g.gain.value = 0.04;

        src.connect(filt);
        filt.connect(g);
        g.connect(ctx.destination);
        src.start();
    }, []);

    return { isPlaying, toggle, playHover };
}
