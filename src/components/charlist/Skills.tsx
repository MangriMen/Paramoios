import { Box, Checkbox, Input, Typography } from '@mui/material';
import { ChangeEvent, FC, ReactNode, useEffect, useState } from 'react';

export const Skills: FC<{ items: { [x: string]: boolean }; setItems: any }> = ({
  items,
  setItems,
  ...props
}) => {
  const [renderedItems, setRenderedItems] = useState<ReactNode>();

  useEffect(() => {
    setRenderedItems(
      Object.keys(items).map((key) => (
        <Box
          key={key}
          display="grid"
          gridTemplateColumns="2.8rem 3rem 10rem"
          justifyContent="space-between"
          alignItems="center"
          marginBottom="0.5rem"
        >
          <Checkbox
            onChange={(
              _event: ChangeEvent<HTMLInputElement>,
              checked: boolean,
            ) => {
              setItems({ ...items, [key]: checked });
            }}
            sx={{ gridColumn: '1' }}
          />
          <Input sx={{ gridColumn: '2', width: '3rem' }} size="small" />
          <Typography fontSize="1.2rem" sx={{ gridColumn: '3' }}>
            {key}
          </Typography>
        </Box>
      )),
    );
  }, [items, setItems]);

  return <Box {...props}>{renderedItems}</Box>;
};
