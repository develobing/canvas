import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getGraphString } from '../utils/utils';
import BarCanvas from './BarCanvas';
import PropTypes from 'prop-types';

const textSizeMap = {
  header: '20px',
  paragraph: '16px',
  legend: '12px',
};

const GraphWrapper = styled.div`
  box-sizing: border-box;
  padding: 25px;
  min-width: 450px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};
`;

const Text = styled.span`
  display: inline-block;
  font-size: ${({ type }) => textSizeMap[type] || 'inherit'};
  font-weight: ${({ $bold }) => ($bold ? 'bold' : 'normal')};
  background: ${({ theme, color = 'foreground' }) => theme.colors[color]};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const Separator = styled.div`
  box-sizing: border-box;
  width: 29px;
  height: 7px;
  margin: 12px 0;
  background: ${({ theme }) => theme.colors['teal-blue']};
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
`;

export default function BarGraph({ data = [], xKey = '', yKey = '' }) {
  const [fontLoaded, setFontLoaded] = useState(false);
  const { lastMonthSales, lastMonth, delta } = getGraphString(data);
  const canvasProps = { data, xKey, yKey };

  useEffect(() => {
    // wait for font to load
    document.fonts.ready.then(() => {
      if (document.fonts.check('1em Roboto')) {
        setFontLoaded(true);
      }
    });
  }, []);

  if (!data || !data.length || !xKey || !yKey)
    return (
      <GraphWrapper>
        <Text type="header">No sales data available</Text>
      </GraphWrapper>
    );

  return (
    <GraphWrapper>
      <Text type="header">
        <Text $bold>{lastMonthSales}</Text> sales in{' '}
        <Text $bold>{lastMonth}</Text>
      </Text>

      <Separator />

      {fontLoaded && <BarCanvas {...canvasProps} />}

      <Footer>
        <Text type="paragraph">
          <Text color="red-pink">{delta.prefix}</Text>{' '}
          <Text $bold color="red-pink">
            {delta.sales}
          </Text>{' '}
          sales from previous month
        </Text>
      </Footer>
    </GraphWrapper>
  );
}

BarGraph.propTypes = {
  data: PropTypes.array.isRequired,
  xKey: PropTypes.string.isRequired,
  yKey: PropTypes.string.isRequired,
};
