import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextWithDateHeaderComponent } from '../../headers/text-with-date-header/text-with-date-header.component';
import { TeamMembersContent } from '../../team-members/team-members-content.component';
import { Helmet } from 'react-helmet';
import { getUser, userStore } from '../../store/user-store';
import { useStore } from 'effector-react';
import { getMembers, membersStore } from '../../store/team-member-store';

export function TeamMembers() {
    useEffect(() => {
        getUser();
    }, []);
    const { companyName, joinedDate, companyId } = useStore(userStore);
    const members = useStore(membersStore);
    useEffect(() => {
        if (companyId !== '') {
            getMembers(companyId);
        }
    }, [companyId]);
    return (
        <main className='flex-grow-1 overflow-auto'>
            <Helmet>
                <title>Team members</title>
            </Helmet>
            <TextWithDateHeaderComponent
                companyName={companyName}
                joinedDate={joinedDate}
            />
            <TeamMembersContent members={members} />
        </main>
    );
}
