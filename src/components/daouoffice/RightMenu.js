import React from 'react';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";

const RightMenu = props => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const onClickSetting = e => {
        if (props.clickedSetting) {
            props.setClickSetting(false);
        } else {
            props.setClickSetting(true);
        }
    }

    const onCheckUseClockInTime = e => {
        const data = {
            clockIn: e.target.checked,
            clockOut: props.useAlarmClock.clockOut
        }
        props.setUseAlarmClock(data);
        ipcRenderer.send('daouoffice.setUseAlarmClock', data);
    }

    const onCheckUseClockOutTime = e => {
        const data = {
            clockIn: props.useAlarmClock.clockIn,
            clockOut: e.target.checked
        }

        props.setUseAlarmClock(data);
        ipcRenderer.send('daouoffice.setUseAlarmClock', data);
    }

    const onClickLogout = () => {
        ipcRenderer.send('daouoffice.logout');
    }

    const displaySettingLayer = () => {
        if (props.clickedSetting) {
            return <div className="setting-layer">
                <div className="ui checkbox">
                    <input type="checkbox" checked={props.useAlarmClock.clockIn} onChange={onCheckUseClockInTime} />
                    <label>출근 시간(<span>{props.userInfo.workStartTime}</span>) 체크 알림 (5분 전)</label>
                </div>
                <div className="ui checkbox">
                    <input type="checkbox" checked={props.useAlarmClock.clockOut} onChange={onCheckUseClockOutTime} />
                    <label>퇴근 시간(<span>{props.userInfo.workEndTime}</span>) 체크 알림 (정시)</label>
                </div>
            </div>;
        }
    }

    if (props.authenticated && props.userInfo) {
        return (
            <div>
                <IconButton>
                    <DragIndicatorIcon className='component-move'/>
                </IconButton>
                <IconButton onClick={props.onClickRefresh}>
                    <RefreshIcon />
                </IconButton>
                <IconButton aria-label="settings" onClick={handleClick}>
                    <MoreVertIcon />
                </IconButton>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <Button sx={{ p: 2 }} onClick={onClickLogout}>
                        Logout
                    </Button>
                </Popover>
            </div>
        )
    } else {
        return null;
    }

    /*if (props.authenticated && props.userInfo) {
        return (
            <div className="btn-right-layer">
                {/!*<Icon name='expand arrows alternate' className='component-move'/>*!/}
                <DragIndicatorIcon className='component-move' />
                <Icon name='refresh' onClick={props.onClickRefresh}/>
                <Menu.Item as='a' href={'https://spectra.daouoffice.com/app/noti/unread'} target='_blank' style={{position:'relative', cursor:'pointer'}}>
                    <Icon name='bell' style={{color:'#000'}}/>
                    <Label color='red' floating style={{display:props.notificationCount>0?"":"none", borderRadius:'16px', fontSize: '10px', padding: '4px'}}>
                        {props.notificationCount}
                    </Label>
                </Menu.Item>
                <Icon name='setting' onClick={onClickSetting}/>
                {displaySettingLayer()}
                <Dropdown trigger={rightBtnTrigger} options={[
                    { key: 'logout', text: 'Logout', onClick: onClickLogout }
                ]} />
            </div>
        )
    } else {
        return null;
    }*/
};

export default RightMenu;
