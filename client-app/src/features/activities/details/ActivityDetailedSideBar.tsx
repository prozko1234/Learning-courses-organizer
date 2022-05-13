import React, { useEffect } from 'react'
import { Segment, List, Label, Item, Image, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';

interface Props {
    activity: Activity;
    likesCount: number;
    isLoggedIn: boolean
}

export default observer(function ActivityDetailedSidebar({ activity: { attendees, host, id }, likesCount, isLoggedIn }: Props) {
    const { activityStore: { like, likes } } = useStore();
    useEffect(() => {
        
    }, [like, likes])
    if (!attendees) return null;
    return (
        <>
            <Segment
                textAlign='center'
                style={{ border: 'none' }}
                attached='top'
                secondary
                inverted
                color='teal'
            >
                {attendees.length} {attendees.length === 1 ? 'Person' : 'People'}
            </Segment>
            {isLoggedIn ?
                <Segment attached>
                    <Icon onClick={like} size='large' color='teal' name='like' /> {likesCount}
                </Segment>
                :
                <Segment attached>
                    <Icon size='large' color='teal' name='like' /> {likesCount}
                </Segment>
            }

            <Segment attached>
                <List relaxed divided>
                    {attendees.map(attendee => (
                        <Item style={{ position: 'relative' }} key={attendee.username}>
                            {attendee.username === host?.username &&
                                <Label
                                    style={{ position: 'absolute' }}
                                    color='orange'
                                    ribbon='right'
                                >
                                    Host
                                </Label>}
                            <Image size='tiny' src={attendee.image || '/assets/user.png'} />
                            <Item.Content verticalAlign='middle'>
                                <Item.Header as='h3'>
                                    <Link to={`/profiles/${attendee.username}`}>{attendee.displayName}</Link>
                                </Item.Header>
                                {attendee.following &&
                                    <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
                                }
                            </Item.Content>
                        </Item>

                    ))}
                </List>
            </Segment>
        </>

    )
})