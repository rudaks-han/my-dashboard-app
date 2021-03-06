import React, {useEffect, useState} from "react";
import { ReactSortable } from "react-sortablejs";
import Jira from "../../components/jira/Jira";
import Daouoffice from "../../components/daouoffice/Daouoffice";
import Outlook from "../../components/outlook/Outlook";
import Jenkins from "../../components/jenkins/Jenkins";
import Sonarqube from "../../components/sonarqube/Sonarqube";
import VictoryPortal from "../../components/victoryPortal/VictoryPortal";
import Modeloffice from "../../components/modeloffice/Modeloffice";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
/*import Item from "semantic-ui-react";*/
const { ipcRenderer } = window.require('electron');

const Content = () => {
    const components = [
        { id: 'jira', name: "Jira" , component: <Jira />},
        { id: 'daouoffice', name: "Daouoffice", component: <Daouoffice /> },
        { id: 'outlook', name: "Outlook", component: <Outlook /> },
        { id: 'jenkins', name: "Jenkins", component: <Jenkins /> },
        { id: 'sonarqube', name: "Sonarqube", component: <Sonarqube /> },
        { id: 'victoryPortal', name: "VictoryPortal", component: <VictoryPortal /> },
        { id: 'modeloffice', name: "Modeloffice", component: <Modeloffice /> },
    ];

    const [state, setState] = useState([]);

    useEffect(() => {
        findComponentSort();
    }, []);

    const findComponentSort = () => {
        ipcRenderer.send('findComponentSort');
        ipcRenderer.on('findComponentSortCallback', (e, data) => {
            let componentsIds = data;
            if (!componentsIds) {
                componentsIds = ["daouoffice", "jira", "outlook", "jenkins", "sonarqube", "victoryPortal", "modeloffice"];
            }

            const sortedComponents = [];
            componentsIds.map(id => {
                components.map(component => {
                    if (component.id === id) {
                        sortedComponents.push(component);
                    }
                })
            });

            setState(sortedComponents);
        });

        return () => {
            ipcRenderer.removeAllListeners('findComponentSortCallback');
        }
    }

    const onSort = (e, data) => {
        const components = state.map(item => item.id);
        ipcRenderer.send('saveComponentSort', components);
    }

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <div className="pusher">
            <div className="main-content">
                <div>
                    <ReactSortable
                        list={state}
                        setList={setState}
                        className={'ui grid  '}
                        onSort={onSort}
                        delayOnTouchStart={true}
                        animation={200}
                        handle={'.component-move'}
                    >
                        {
                            state.map((item) => (
                                <div key={item.id} className="five wide computer eight wide tablet sixteen wide mobile column component">
                                    {item.component}
                                </div>
                            ))
                        }
                    </ReactSortable>
                </div>
            </div>
        </div>
    )
};

export default Content;
