import React, { PropTypes } from 'react';
import globalStyles from 'scenes/styles';

const styles = Object.assign({}, globalStyles, {
    header: {
        alignItems: 'center',
        backgroundColor: globalStyles.palette.canvasColor,
        color: globalStyles.palette.textColor,
        display: 'flex',
        fontSize: globalStyles.typography.headerSize,
        height: '56px',
        padding: `0 ${globalStyles.spacing.gutterStandard}`,
    },
});

const PaperHeader = ({
    title,
}) => (
    <div style={styles.header}>
        {title}
    </div>
);

PaperHeader.propTypes = {
    title: PropTypes.string.isRequired,
};

export default PaperHeader;
