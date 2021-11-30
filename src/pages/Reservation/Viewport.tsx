import { Viewport as PixiViewport } from 'pixi-viewport';
import * as PIXI from 'pixi.js';
import React from 'react';

import { PixiComponent, useApp } from '@inlet/react-pixi';

type ViewportProps = {
  viewportWidth: number;
  viewportHeight: number;
  worldWidth: number;
  worldHeight: number;
  onManipulationStart: () => void;
  onManipulationEnd: () => void;
  children?: React.ReactNode;
};

type PixiComponentViewportProps = ViewportProps & {
  app: PIXI.Application;
};

const PixiComponentViewport = PixiComponent('Viewport', {
  create: (props: PixiComponentViewportProps) => {
    const viewport = new PixiViewport({
      screenWidth: props.viewportWidth,
      screenHeight: props.viewportHeight,
      worldWidth: props.worldWidth,
      worldHeight: props.worldHeight,
      ticker: props.app.ticker,
      interaction: props.app.renderer.plugins.interaction,
    });
    viewport
      .drag()
      .pinch()
      .wheel()
      .clamp({ direction: 'all' })
      .clampZoom({ minScale: 0.4, maxScale: 2 });

    viewport.on('drag-start', () => {
      props.onManipulationStart();
    });

    viewport.on('drag-end', () => {
      props.onManipulationEnd();
    });

    viewport.on('pinch-start', () => {
      props.onManipulationStart();
    });

    viewport.on('pinch-end', () => {
      props.onManipulationEnd();
    });

    viewport.on('snap-zoom-start', () => {
      props.onManipulationStart();
    });

    viewport.on('snap-zoom-end', () => {
      props.onManipulationEnd();
    });

    viewport.on('snap-start', () => {
      props.onManipulationStart();
    });

    viewport.on('snap-end', () => {
      props.onManipulationEnd();
    });

    return viewport;
  },
});

export const Viewport: React.FC<ViewportProps> = props => {
  const app = useApp();
  return <PixiComponentViewport app={app} {...props} />;
};
