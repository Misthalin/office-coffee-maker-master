import React from 'react'

import Thermos from '../../components/Coffee/Thermos/Thermos'

export default {
    title: "Coffee/Thermos",
    component: Thermos,
}

const Template = args => <Thermos {...args} />

export const Index = Template.bind({})
Index.args = {
    litersBrewed: 2.2
}