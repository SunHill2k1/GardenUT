// @mui
import {
  Box,
  Card,
  Container,
  Grid,
  Stack,
  Tab,
  Typography,
} from "@mui/material";
import { ReactElement } from "react";

interface GeneralCardProps {
  color: string;
  count: number;
  unit?: string;
  longUnit?: string[];
  status: string;
  icon: ReactElement;
  selected?: boolean;
  onClick?: any;
}

const GeneralCard = ({
  color,
  count,
  unit,
  longUnit,
  status,
  icon,
  selected,
  onClick,
}: GeneralCardProps) => (
  <Card
    sx={{
      boxShadow: selected
        ? `0 8px 16px ${color}CC`
        : "0 8px 16px rgba(0, 0, 0, .25)",
      height: "120px",
      bgcolor: color + "cc",
      color: "#fff",
      "&:hover": { cursor: "pointer", boxShadow: `0 8px 16px ${color}CC` },
    }}
    onClick={onClick}
  >
    <Box display="flex" justifyContent="space-between" p="24px">
      <Stack fontSize="18px" lineHeight="18px" fontWeight="400">
        <Box
          display="flex"
          alignItems={unit ? "baseline" : "none"}
          fontSize="16px"
          my={1}
        >
          <Typography fontWeight="500" fontSize="40px" lineHeight="1" pr={0.5}>
            {count}
          </Typography>{" "}
          {unit || (
            <>
              {longUnit?.[0]}
              <br /> {longUnit?.[1]}{" "}
            </>
          )}
        </Box>
        {status}
      </Stack>
      {icon}
    </Box>
  </Card>
);

export default GeneralCard;
