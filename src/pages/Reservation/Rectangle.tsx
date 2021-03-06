import { Graphics as GraphicsType } from 'pixi.js';
import React from 'react';

import { Graphics } from '@inlet/react-pixi';

type RectangleProps = {
  color: number;
  lefttop: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  manipulating: boolean;
  selected: boolean;
  disabled: boolean;
  onClick: () => void;
};

export const Rectangle: React.FC<RectangleProps> = props => {
  const draw = React.useCallback(
    (g: GraphicsType) => {
      const {
        color,
        lefttop: { x, y },
        size: { width, height },
      } = props;
      g.clear();
      g.beginFill(
        props.disabled ? 0xe9e9e9 : color,
        props.disabled || props.selected ? 1 : 0.3,
      );
      g.drawRect(x, y, width, height);
      g.endFill();
    },
    [props],
  );

  return (
    <Graphics
      draw={draw}
      interactive
      pointerup={
        props.manipulating || props.disabled ? undefined : props.onClick
      }
    />
  );
};
