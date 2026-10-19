/**
 * ResponsiveTable
 * A normal MUI table on tablets and desktops. Below the `md` breakpoint every
 * row turns into a labelled card, so wide tables (fees, students…) stay
 * readable on a phone without sideways scrolling.
 *
 * Column labels are read from the <thead> automatically, so existing tables
 * only need `<Table>` swapped for `<ResponsiveTable>`.
 */

import React, { useLayoutEffect, useRef } from 'react';
import { Table } from '@mui/material';

const ResponsiveTable = ({ children, sx, ...props }) => {
    const ref = useRef(null);

    // Runs after every render so rows added by search / refresh are labelled too
    useLayoutEffect(() => {
        const table = ref.current;
        if (!table) return;
        const labels = Array.from(table.querySelectorAll('thead th')).map((th) =>
            th.textContent.trim()
        );
        table.querySelectorAll('tbody tr').forEach((row) => {
            Array.from(row.children).forEach((cell, i) => {
                if (cell.colSpan > 1) return; // empty-state rows stay as they are
                cell.setAttribute('data-label', labels[i] || '');
            });
        });
    });

    return (
        <Table
            ref={ref}
            {...props}
            sx={{
                '@media (max-width:899.95px)': {
                    display: 'block',
                    '& thead': {
                        // keep headers for screen readers, hide them visually
                        position: 'absolute',
                        width: 1,
                        height: 1,
                        overflow: 'hidden',
                        clip: 'rect(0 0 0 0)',
                    },
                    '& tbody': { display: 'block', p: 1.5 },
                    '& tbody tr': {
                        display: 'block',
                        mb: 1.5,
                        py: 0.75,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: '10px',
                        bgcolor: 'background.paper',
                    },
                    '& tbody tr:last-child': { mb: 0 },
                    '& tbody td': {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 2,
                        py: 0.9,
                        px: 2,
                        border: 0,
                        textAlign: 'right',
                        overflowWrap: 'anywhere',
                    },
                    '& tbody td[data-label]::before': {
                        content: 'attr(data-label)',
                        flexShrink: 0,
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        color: 'text.secondary',
                        textAlign: 'left',
                    },
                    // action buttons sit on their own line at the bottom of the card
                    '& tbody td[data-label="Actions"]': {
                        justifyContent: 'flex-end',
                        borderTop: '1px solid',
                        borderColor: 'divider',
                        mt: 0.75,
                        pt: 1,
                    },
                    '& tbody td[data-label="Actions"]::before': { display: 'none' },
                    '& tbody td[colspan]': { display: 'block', textAlign: 'center' },
                },
                ...sx,
            }}
        >
            {children}
        </Table>
    );
};

export default ResponsiveTable;
