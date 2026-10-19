/**
 * Design tokens
 * Chalkboard + marking-pen palette: the sidebar and dashboard board use the
 * fixed "board" colours in both light and dark mode; the rest follows the theme.
 */

export const board = {
    base: '#1F3A34',     // chalkboard green
    deep: '#162B26',     // darker slab behind the board
    chalk: '#F2EFE6',    // chalk white
    chalkDim: 'rgba(242, 239, 230, 0.68)',
    chalkLine: 'rgba(242, 239, 230, 0.16)',
    marigold: '#F2B632', // chalk-yellow accent
};

export const ink = {
    red: '#C8432B',      // teacher's red pen: unpaid, absent, delete
    green: '#2F8F5B',    // tick: paid, present, active
    blue: '#2F5DA8',     // blue pen: info
};

export const fonts = {
    heading: '"Bricolage Grotesque", "Segoe UI", system-ui, sans-serif',
    body: '"Figtree", "Segoe UI", system-ui, -apple-system, sans-serif',
};

export const drawerWidth = 252;
