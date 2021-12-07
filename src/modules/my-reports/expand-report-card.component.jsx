import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { CollapsingCard } from './collapsing-card.component';
import { ExtensibleSmile } from '../common/components/pictures/smile.component';

export function ExpandReportCard({
    duration,
    weeklyInformation,
    weeklyNotations,
    externalControl,
}) {
    const [toggledState, setToggledState] = useState(false);

    let onClickHandler = () => {
        setToggledState((prevState) => !prevState);
    };
    useEffect(() => {
        setToggledState(externalControl);
    }, [externalControl]);

    let classList = [
        'row',
        'flex-nowrap',
        'align-items-center',
        'justify-content-around',
        'p-0',
        'm-0',
        'col-lg-5',
    ];

    let smileImages = toggledState ? (
        <div className='col-9'></div>
    ) : (
        weeklyInformation.map((el) => {
            return (
                <div
                    className='col d-flex justify-content-center'
                    key={el.stateName}>
                    <ExtensibleSmile
                        smileNumber={el.stateLevel}
                        additionalClasses={'big-smile'}
                    />
                </div>
            );
        })
    );
    const collapsedButtonClasses = ['btn', 'dropdown-toggle', 'col'];
    const durationLabelClasses = ['py-3', 'my-2', 'col-lg-7', 'fw-bold'];
    const cardControlClasses = [
        'row',
        'flex-nowrap',
        'justify-content-between',
        'align-items-center',
        'mb-2',
        'w-100',
    ];
    if (toggledState) {
        collapsedButtonClasses.push('btn-dark');
        cardControlClasses.push('bg-dark');
    } else {
        collapsedButtonClasses.push('btn-white');
        cardControlClasses.push('bg-white');
    }

    return (
        <div className='d-flex flex-column align-items-center main-background'>
            <div className={cardControlClasses.join(' ')}>
                <p
                    className={durationLabelClasses.join(' ')}
                    style={
                        toggledState
                            ? { color: 'var(--bs-warning)' }
                            : { color: 'black' }
                    }>
                    {duration}
                </p>
                <div className={classList.join(' ')}>
                    {smileImages}
                    <button
                        type='button'
                        className={collapsedButtonClasses.join(' ')}
                        onClick={onClickHandler}>
                        {toggledState ? 'Collapse' : 'Expand'}
                    </button>
                </div>
            </div>
            <CollapsingCard
                weeklyNotations={weeklyNotations}
                weeklyInformation={weeklyInformation}
                isCollapsed={toggledState}
            />
        </div>
    );
}

ExpandReportCard.propTypes = {
    duration: PropTypes.string,
    weeklyInformation: PropTypes.arrayOf(
        PropTypes.shape({
            stateName: PropTypes.string,
            stateLevel: PropTypes.number,
            comments: PropTypes.string,
        })
    ),
    weeklyNotations: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string,
            title: PropTypes.string,
        })
    ),
    externalControl: PropTypes.bool,
};
