import React from 'react';
import BarGraph from './BarGraph';
import Provider from './theme/Provider';

export default {
  title: 'Variants/BarGraph',
  component: BarGraph,
  decorators: [
    (Story) => (
      <Provider>
        <Story />
      </Provider>
    ),
  ],
};

// we are dealing with user understandable data
// but for calculations, we need to identify x and y axis data
const data = [
  { sales: 2610000, month: 'Jan' },
  { sales: 6320000, month: 'Feb' },
  { sales: 3830000, month: 'Mar' },
  { sales: 4640000, month: 'Apr' },
  { sales: 5250000, month: 'May' },
  { sales: 3360000, month: 'Jun' },
  { sales: 2870000, month: 'Jul' },
  { sales: 4580000, month: 'Aug' },
  { sales: 5790000, month: 'Sep' },
  { sales: 3200000, month: 'Oct' },
  { sales: 7511000, month: 'Nov' },
  { sales: 9212000, month: 'Dec' },
];

const Template = (args) => <BarGraph data={data} {...args} />;

export const Default = Template.bind({});

Default.args = {
  data,
  xKey: 'month',
  yKey: 'sales',
};

// With long data
const longData = [
  { sales: 22610000, month: 'Jan' },
  { sales: 263220000, month: 'Feb' },
  { sales: 38330000, month: 'Mar' },
  { sales: 46402000, month: 'Apr' },
  { sales: 52500300, month: 'May' },
  { sales: 233600020, month: 'Jun' },
  { sales: 28700030, month: 'Jul' },
  { sales: 545800020, month: 'Aug' },
  { sales: 57900000, month: 'Sep' },
  { sales: 32000000, month: 'Oct' },
  { sales: 75110000, month: 'Nov' },
  { sales: 92120000, month: 'Dec' },
];

export const WithLongData = Template.bind({});
WithLongData.args = {
  data: longData,
  xKey: 'month',
  yKey: 'sales',
};

// with negative data
const negativeData = [
  { sales: 2610000, month: 'Jan' },
  { sales: -6320000, month: 'Feb' },
  { sales: 3830000, month: 'Mar' },
  { sales: -4640000, month: 'Apr' },
  { sales: 5250000, month: 'May' },
  { sales: -3360000, month: 'Jun' },
  { sales: 2870000, month: 'Jul' },
  { sales: -4580000, month: 'Aug' },
];

export const WithNegativeData = Template.bind({});
WithNegativeData.args = {
  data: negativeData,
  xKey: 'month',
  yKey: 'sales',
};

// without any data
export const WithoutData = Template.bind({});

// with higher data set (yearly)
const yearlyData = [
  { sales: 2610000, year: 2024 },
  { sales: 6320000, year: 2023 },
  { sales: 3830000, year: 2022 },
  { sales: 4640000, year: 2021 },
  { sales: 5250000, year: 2020 },
  { sales: 3360000, year: 2019 },
  { sales: 2870000, year: 2018 },
  { sales: 4580000, year: 2017 },
  { sales: 5790000, year: 2016 },
];

export const WithYearlyData = Template.bind({});
WithYearlyData.args = {
  data: yearlyData,
  xKey: 'year',
  yKey: 'sales',
};
