import React, { useEffect, useState } from "react";
import { Box, Text } from "grommet";
import { Button } from "src/components/ui";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { breakpoints } from "src/responsive/breakpoints";
import { BaseContainer, BasePage } from "src/components/ui";
import { Metrics } from "src/components/metrics";
import { LatestBlocksTable } from "./LatestBlocksTable";
import { LatestTransactionsTable } from "./LatestTransactionsTable";
import { Block } from "src/types";
import { getBlocks } from "src/api/client";
import { calculateSecondPerBlocks, calculateSecondsPerBlock } from "./helpers";
import { ShardDropdown } from "src/components/ui/ShardDropdown";
import { getTabHidden, useWindowFocused } from "src/hooks/useWindowFocusHook";
import { config } from "../../config";

const filter = {
  offset: 0,
  limit: 10,
  orderBy: "number",
  orderDirection: "desc",
  value: 0,
  filters: [],
};



export function MainPage() {


  return (
    <BaseContainer pad="320">
      <Box gap="medium">
        <BasePage style={{ flex: "1 1 100%" }} pad={'0'}>


        </BasePage>

      </Box>
    </BaseContainer>
  );
}
