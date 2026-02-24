---
description: Fixing GSAP ScrollTrigger execution order bugs between pinned sections
---

## Problema: Ejecución Fuera de Orden

Cuando hay **múltiples ScrollTriggers con `pin: true`** en distintos componentes React, el orden en que `useLayoutEffect` se ejecuta puede hacer que secciones inferiores calculen sus offsets **antes** de que la sección superior haya creado su `pin-spacer`. Resultado: la sección inferior se pega (fixed) en la posición incorrecta, a mitad de otra sección.

Esto ocurrió en este proyecto con el **HorizontalScroll** (en `useHorizontalScroll.ts`) y **LoreCards** (componente hijo).

## Solución: `refreshPriority`

Añadir `refreshPriority: 1` al `scrollTrigger` de la sección que debe calcularse **primero** (la que está más arriba en el DOM):

```ts
// useHorizontalScroll.ts
scrollTrigger: {
  trigger: container,
  pin: true,
  scrub: 0.3,
  end: () => "+=" + (track.scrollWidth - window.innerWidth),
  invalidateOnRefresh: true,
  refreshPriority: 1, // <-- Asegura que este se calcule antes que LoreCards (prioridad 0)
},
```

- Las secciones tienen prioridad `0` por default.
- `refreshPriority: 1` (o mayor) hace que GSAP calcule ese ScrollTrigger primero en el ciclo de `refresh()`.
- No requiere refactorización de la arquitectura de React.

## Regla General

> Siempre que una sección A esté arriba y sea `pinned`, y una sección B esté debajo y también use ScrollTrigger, añadir `refreshPriority: 1` a la sección A.
