/**
 * Settings
 * Functional user preferences with inline SVG icons.
 */

import React, { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    Typography,
    Switch,
    Divider,
    Button,
    Select,
    MenuItem,
    FormControl,
    Grid,
    Alert,
    Snackbar,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemSecondaryAction,
    Stack,
    Chip,
} from '@mui/material';
import { useTheme } from '../../context/ThemeContext';

/* ------------------------------------------------------------------ */
/* Inline SVG icon set (no external dependencies)                     */
/* ------------------------------------------------------------------ */

const iconProps = {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
};

const SunIcon = () => (
    <svg {...iconProps}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
);

const MoonIcon = () => (
    <svg {...iconProps}>
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
);

const BellIcon = () => (
    <svg {...iconProps}>
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
);

const GlobeIcon = () => (
    <svg {...iconProps}>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
);

const SaveIcon = () => (
    <svg {...iconProps}>
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
        <path d="M17 21v-8H7v8M7 3v5h8" />
    </svg>
);

const ResetIcon = () => (
    <svg {...iconProps}>
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
        <path d="M8 16H3v5" />
    </svg>
);

const PaletteIcon = () => (
    <svg {...iconProps}>
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
        <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
        <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
        <path d="M12 2a10 10 0 0 0 0 20c1.66 0 3-1.34 3-3 0-.83-.34-1.58-.88-2.12-.54-.55-.88-1.3-.88-2.12 0-1.66 1.34-3 3-3H18a4 4 0 0 0 4-4c0-5.52-4.48-10-10-10z" />
    </svg>
);

const SlidersIcon = () => (
    <svg {...iconProps}>
        <line x1="4" y1="21" x2="4" y2="14" />
        <line x1="4" y1="10" x2="4" y2="3" />
        <line x1="12" y1="21" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12" y2="3" />
        <line x1="20" y1="21" x2="20" y2="16" />
        <line x1="20" y1="12" x2="20" y2="3" />
        <line x1="1" y1="14" x2="7" y2="14" />
        <line x1="9" y1="8" x2="15" y2="8" />
        <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
);

/* ------------------------------------------------------------------ */
/* Settings component                                                 */
/* ------------------------------------------------------------------ */

const DEFAULT_SETTINGS = {
    notifications: true,
    language: 'en',
    autoSave: true,
};

const LANGUAGES = {
    en: 'English',
    es: 'Español',
    fr: 'Français',
    de: 'Deutsch',
};

const Settings = () => {
    const { darkMode, toggleDarkMode } = useTheme();
    const [settings, setSettings] = useState(DEFAULT_SETTINGS);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        const saved = localStorage.getItem('userSettings');
        if (saved) {
            try {
                setSettings((prev) => ({ ...prev, ...JSON.parse(saved) }));
            } catch {
                /* ignore malformed data */
            }
        }
    }, []);

    const handleChange = (key, value) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
        localStorage.setItem('userSettings', JSON.stringify(settings));
        setSnackbar({ open: true, message: 'Settings saved.', severity: 'success' });
    };

    const handleReset = () => {
        setSettings(DEFAULT_SETTINGS);
        localStorage.removeItem('userSettings');
        setSnackbar({ open: true, message: 'Settings reset to defaults.', severity: 'info' });
    };

    const closeSnackbar = () => setSnackbar((s) => ({ ...s, open: false }));

    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Settings
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Manage your preferences. Changes are saved locally.
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {/* ------------------------------ Left column ------------------------------ */}
                <Grid item xs={12} md={8}>
                    {/* Appearance */}
                    <Paper variant="outlined" sx={{ mb: 3 }}>
                        <Box sx={{ p: 2.5, borderBottom: '1px solid', borderColor: 'divider' }}>
                            <Typography
                                variant="h6"
                                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                            >
                                <PaletteIcon />
                                Appearance
                            </Typography>
                        </Box>
                        <List disablePadding>
                            <ListItem sx={{ py: 1.5 }}>
                                <ListItemIcon sx={{ color: 'primary.main' }}>
                                    {darkMode ? <MoonIcon /> : <SunIcon />}
                                </ListItemIcon>
                                <ListItemText
                                    primary="Dark mode"
                                    secondary={darkMode ? 'Dark theme is on' : 'Light theme is on'}
                                    primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }}
                                    secondaryTypographyProps={{ fontSize: '0.8rem' }}
                                />
                                <ListItemSecondaryAction>
                                    <Switch
                                        checked={darkMode}
                                        onChange={toggleDarkMode}
                                        size="small"
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        </List>
                    </Paper>

                    {/* Preferences */}
                    <Paper variant="outlined" sx={{ mb: 3 }}>
                        <Box sx={{ p: 2.5, borderBottom: '1px solid', borderColor: 'divider' }}>
                            <Typography
                                variant="h6"
                                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                            >
                                <SlidersIcon />
                                Preferences
                            </Typography>
                        </Box>
                        <List disablePadding>
                            <ListItem sx={{ py: 1.5 }}>
                                <ListItemIcon sx={{ color: 'primary.main' }}>
                                    <BellIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Notifications"
                                    secondary="Show in-app toast notifications"
                                    primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }}
                                    secondaryTypographyProps={{ fontSize: '0.8rem' }}
                                />
                                <ListItemSecondaryAction>
                                    <Switch
                                        checked={settings.notifications}
                                        onChange={(e) =>
                                            handleChange('notifications', e.target.checked)
                                        }
                                        size="small"
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>

                            <Divider component="li" />

                            <ListItem sx={{ py: 1.5 }}>
                                <ListItemIcon sx={{ color: 'primary.main' }}>
                                    <SaveIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Auto-save forms"
                                    secondary="Automatically save your input as you type"
                                    primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }}
                                    secondaryTypographyProps={{ fontSize: '0.8rem' }}
                                />
                                <ListItemSecondaryAction>
                                    <Switch
                                        checked={settings.autoSave}
                                        onChange={(e) =>
                                            handleChange('autoSave', e.target.checked)
                                        }
                                        size="small"
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>

                            <Divider component="li" />

                            <ListItem sx={{ py: 1.5 }}>
                                <ListItemIcon sx={{ color: 'primary.main' }}>
                                    <GlobeIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Language"
                                    secondary="Interface language"
                                    primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }}
                                    secondaryTypographyProps={{ fontSize: '0.8rem' }}
                                />
                                <ListItemSecondaryAction>
                                    <FormControl size="small" sx={{ minWidth: 130 }}>
                                        <Select
                                            value={settings.language}
                                            onChange={(e) =>
                                                handleChange('language', e.target.value)
                                            }
                                        >
                                            {Object.entries(LANGUAGES).map(([code, label]) => (
                                                <MenuItem key={code} value={code}>
                                                    {label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </List>
                    </Paper>

                    {/* Actions */}
                    <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                        <Button
                            variant="contained"
                            startIcon={<SaveIcon />}
                            onClick={handleSave}
                        >
                            Save settings
                        </Button>
                        <Button
                            variant="outlined"
                            color="inherit"
                            startIcon={<ResetIcon />}
                            onClick={handleReset}
                        >
                            Reset to defaults
                        </Button>
                    </Stack>
                </Grid>

                {/* ------------------------------ Right column ------------------------------ */}
                <Grid item xs={12} md={4}>
                    <Paper variant="outlined" sx={{ p: 2.5 }}>
                        <Typography variant="h6" gutterBottom>
                            Current configuration
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Stack spacing={1.5}>
                            <SummaryRow label="Theme" value={darkMode ? 'Dark' : 'Light'} />
                            <SummaryRow
                                label="Notifications"
                                value={settings.notifications ? 'On' : 'Off'}
                            />
                            <SummaryRow
                                label="Auto-save"
                                value={settings.autoSave ? 'On' : 'Off'}
                            />
                            <SummaryRow
                                label="Language"
                                value={LANGUAGES[settings.language] || settings.language}
                            />
                        </Stack>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="caption" color="text.secondary">
                            Version 1.0.0
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={closeSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={closeSnackbar}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

const SummaryRow = ({ label, value }) => (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">
            {label}
        </Typography>
        <Chip label={value} size="small" variant="outlined" />
    </Box>
);

export default Settings;