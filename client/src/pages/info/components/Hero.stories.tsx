import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Hero from "./Hero";

export default {
  title: "pages/info/components/Hero",
  component: Hero,
} as ComponentMeta<typeof Hero>;

const Template: ComponentStory<typeof Hero> = (args) => <Hero {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: "Cheeky Monkeys Day Nursery",
  localAuthority: "Nottinghamshire",
  schoolType: "Full day care",
  minorGroup: "Childcare on non-domestic premises",
  ofstedRating: 1,
  dateOfLastInspection: new Date(),
  webLink: "/CARE/EY478916",
  urn: "EY478916",
};

// {
//   "id": "KPHKSOzHNw",
//   "webLink": "/CARE/EY478916",
//   "urn": "EY478916",
//   "localAuthorityId": 891,
//   "localAuthority": "Nottinghamshire",
//   "minorGroup": "Childcare on non-domestic premises",
//   "schoolType": "Full day care",
//   "isOpen": true,
//   "isNursery": true,
//   "isPost16": false,
//   "isPrimary": false,
//   "isSecondary": false,
//   "name": "Cheeky Monkeys Day Nursery",
//   "address": "55 Whitfield Street",
//   "town": "Newark",
//   "postcode": "NG24 1QX",
//   "lat": 53.072953,
//   "long": -0.802279,
//   "telephone": "01636707819",
//   "gender": 4,
//   "ofstedRating": 0,
//   "dateOfLastInspection": null
// },
