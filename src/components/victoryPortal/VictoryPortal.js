import React, {useContext, useEffect, useState} from 'react';
import victoryPortalIcon from '../../static/image/wordpress-logo.svg';
import {Card, Tab} from 'semantic-ui-react'
import UiShare from '../../UiShare';
import TimerContext from "../../TimerContext";
import RecentPostList from "./RecentPostList";
import RightMenu from "./RightMenu";
import AddLinkLayer from "../share/AddLinkLayer";
import TitleLayer from "../share/TitleLayer";
import ContentLayer from "./ContentLayer";

const { ipcRenderer } = window.require('electron');

const VictoryPortal = () => {
    const [list, setList] = useState(null);
    const tickTime = useContext(TimerContext);

    useEffect(() => {
        findList();
    }, []);

    useEffect(() => {
        if (tickTime == null) return;
        const { minute } = UiShare.getTimeFormat(tickTime);
        if (minute === 0) {
            findList();
        }
    }, [tickTime]);

    const findList = () => {
        setList(null);
        ipcRenderer.send('victoryPortal.findList');
        ipcRenderer.removeAllListeners('victoryPortal.findListCallback');
        ipcRenderer.on('victoryPortal.findListCallback', async (e, data) => {
            setList(data);
        });
    }

    const displayListLayer = () => {
        return (
            <div className="list-layer">
                <Tab panes={[
                    { menuItem: '최근 글', render: () =>
                            <Tab.Pane>
                                <RecentPostList list={list} />
                            </Tab.Pane>}
                ]} />
            </div>
        );
    }

    const onClickRefresh = () => {
        findList();
    }

    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>
                    <TitleLayer title="Victory Portal" icon={victoryPortalIcon} />
                    <RightMenu onClickRefresh={onClickRefresh}/>
                </Card.Header>
                <ContentLayer
                    list={list}
                />
            </Card.Content>
            <Card.Content extra>
                <AddLinkLayer href="https://victory-portal.spectra.co.kr/" />
            </Card.Content>
        </Card>
    )
};

export default VictoryPortal;
