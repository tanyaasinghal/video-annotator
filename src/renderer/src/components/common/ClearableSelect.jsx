import {
    Box,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";

export default function ClearableSelect({
    label,
    placeholder = label,
    value,
    options,
    onChange,
    onClear,
    selectSx,
    inputLabelSx,
    disabled = false,
    open,
    onOpen,
    onClose,
    ...props
}) {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mt: 2,
            }}
        >
            <FormControl fullWidth>

                <InputLabel sx={inputLabelSx}>
                    {placeholder}
                </InputLabel>

                <Select
                    sx={selectSx}
                    label={placeholder}
                    value={value}
                    disabled={disabled}
                    open={open}
                    onOpen={onOpen}
                    onClose={onClose}
                    onChange={onChange}
                    {...props}
                >
                    {options.map((option) => (

                        <MenuItem
                            key={option}
                            value={option}
                        >
                            {option}
                        </MenuItem>

                    ))}
                </Select>

            </FormControl>

            <IconButton
                size="small"
                disabled={!value}
                onClick={onClear}
                sx={{
                    color: "#cccccc"
                }}
            >
                <ClearIcon />
            </IconButton>

        </Box>
    );
}