import * as React from 'react';
import CompanyBoardList from "./CompanyBoardList";
import CompanyDayoffList from "./CompanyDayoffList";
import MyDayoffList from "./MyDayoffList";
import LoginLayer from "../share/LoginLayer";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

const ContentLayer = props => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    if (props.authenticated) {
        return (
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="전사 게시판" />
                        <Tab label="회사 연차현황" />
                        <Tab label="내 연차" />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <CompanyBoardList list={props.list}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <CompanyDayoffList dayoffList={props.dayoffList} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <MyDayoffList myDayoffList={props.myDayoffList} />
                </TabPanel>
            </Box>
        )
    } else {
        return (
            <LoginLayer {...props} />
        )
    }
};

export default ContentLayer;
