import React from 'react';
import { TitleBlockComponent } from './title-block.component';

export default {
    title: 'Elements/Containers/Title block',
    component: TitleBlockComponent,
};

const Template = (args) => <TitleBlockComponent {...args} />;
export const TitleBlockTemplate = Template.bind({});
TitleBlockTemplate.args = {
    title: "Edit Anatoliy's information",
    children:
        'You may assign leaders or team members to this person,' +
        ' as well as deactivate their account if they no longer work for your organization.',
};
