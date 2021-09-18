import React, {useContext} from 'react';
import UserContext from '../../UserContext';
import {withStyles} from "@mui/styles";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

const { ipcRenderer } = window.require('electron');

const styles = {
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    }
};

function Header() {
    const userInfo = useContext(UserContext);
    /*const initialNotificationSettings = {
        outlook_newMail: true,
        jenkins_buildFail: true,
        sonarqube_hasError: true
    }

    const [open, setOpen] = useState(false);
    const [notificationSettings, setNotificationSettings] = useState(initialNotificationSettings);

    useEffect(() => {
        findNotificationSettings();
    }, []);

    const findNotificationSettings = () => {
        ipcRenderer.send('findStore', { key: 'notificationSettings'});
        ipcRenderer.on('findStoreCallback', (e, data) => {
            if (data) {
                setNotificationSettings(data);
            }
        });

        return () => {
            ipcRenderer.removeAllListeners('findStore');
        };
    }*/

    const onClickLogout = () => {
        ipcRenderer.send(`logout`);
    }

    /*const clickCancel = () => {
        setOpen(false);
    }

    const clickConfirm = () => {
        setOpen(false);
        ipcRenderer.send('saveStore', { key: 'notificationSettings', value: notificationSettings});

        UiShare.showNotification('알림설정이 저장되었습니다');
    }

    const onChangeNotification = (e, data) => {
        const settings = {
            ...notificationSettings
        }
        settings[data.name] = data.checked;

        setNotificationSettings(settings);
    }

    const settingContent = () => {
        return (
            <Modal
                as={Form}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button>알림 설정</Button>}
                size="small"
            >
                <Modal.Content>
                    <Form.Field>
                        <Checkbox label='[Outlook] 새 메일 알림' checked={notificationSettings.outlook_newMail} name="outlook_newMail" onChange={onChangeNotification}/>
                    </Form.Field>
                    <Form.Field>
                        <Checkbox label='[Jenkins] build 실패 알림' checked={notificationSettings.jenkins_buildFail} name="jenkins_buildFail" onChange={onChangeNotification} />
                    </Form.Field>
                    <Form.Field>
                        <Checkbox label='[Sonarqube] 오류 알림' checked={notificationSettings.sonarqube_hasError} name="sonarqube_hasError" onChange={onChangeNotification} />
                    </Form.Field>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={clickCancel}>No</Button>
                    <Button positive onClick={clickConfirm}>Yes</Button>
                </Modal.Actions>
            </Modal>
        );
    }*/

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >

                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        My Dashboard
                    </Typography>
                    <Typography variant="h6" color="inherit" align="right">
                        {userInfo.name} 님
                    </Typography>
                    <Button color="inherit" >Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>

        /*<Menu size='tiny'>

            <Menu.Menu position='right'>
                {/!*<Menu.Item>
                    {settingContent()}
                </Menu.Item>*!/}

                <Menu.Item>
                    {userInfo.name} 님
                </Menu.Item>
                <Menu.Item>
                    <Button variant="outlined">Outlined</Button>
                    {/!*<Button primary onClick={onClickLogout}>Log out</Button>*!/}
                </Menu.Item>
            </Menu.Menu>
        </Menu>*/
    )
}

export default withStyles(styles)(Header);
