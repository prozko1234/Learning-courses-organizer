import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/modules/activity';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface Props {
    activities: Activity[]
    selectedActivity: Activity | undefined
    selectActivity: (id: string) => void
    cancelSelectActivity: () => void
    editMode: boolean
    openForm: (id: string) => void
    closeForm: () => void
    createOrEdit: (activity: Activity) => void
    deleteActivity: (id: string) => void
    submiting: boolean
}

export default function ActivityDashboard({ activities, selectActivity, selectedActivity,
    cancelSelectActivity, editMode, openForm, closeForm, createOrEdit, deleteActivity, submiting }: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities}
                    selectActivity={selectActivity}
                    deleteActivity={deleteActivity}
                    submiting={submiting}
                />
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedActivity && !editMode &&
                    <ActivityDetails
                        activity={selectedActivity}
                        cancelSelectActivity={cancelSelectActivity}
                        openForm={openForm}
                    />}
                {editMode &&
                    <ActivityForm closeForm={closeForm} submiting={submiting} activity={selectedActivity} createOrEdit={createOrEdit} />}
            </Grid.Column>
        </Grid>
    )
}