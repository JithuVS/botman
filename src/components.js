module.exports = {
    confirmation: context => {
        return {
            channel: context.channel_id,
            text: 'Report logged!',
            blocks: JSON.stringify([
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: '*Report logged!*'
                    }
                },
                {
                    type: 'divider'
                },
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: `*Title*\n${context.title}\n\n*Description*\n${context.description}`
                    }
                },
                {
                    type: 'context',
                    elements: [
                        {
                            type: 'mrkdwn',
                            text: `*Urgency*: ${context.urgency}`
                        }
                    ]
                }
            ])
        }
    },
    modal: context => {
        return {
            trigger_id: context.trigger_id,
            view: JSON.stringify({
                type: 'modal',
                title: {
                    type: 'plain_text',
                    text: 'Submit a Report'
                },
                callback_id: 'report-log',
                submit: {
                    type: 'plain_text',
                    text: 'Submit'
                },
                blocks: [
                    {
                        block_id: 'title_block',
                        type: 'input',
                        label: {
                            type: 'plain_text',
                            text: 'Title'
                        },
                        element: {
                            action_id: 'title',
                            type: 'plain_text_input'
                        },
                        hint: {
                            type: 'plain_text',
                            text: 'Quick summary of the problem'
                        }
                    },
                    {
                        block_id: 'description_block',
                        type: 'input',
                        label: {
                            type: 'plain_text',
                            text: 'Description'
                        },
                        element: {
                            action_id: 'description',
                            type: 'plain_text_input',
                            multiline: true
                        },
                        optional: true
                    },
                    {
                        block_id: 'urgency_block',
                        type: 'input',
                        label: {
                            type: 'plain_text',
                            text: 'Importance'
                        },
                        element: {
                            action_id: 'urgency',
                            type: 'static_select',
                            options: [
                                {
                                    text: {
                                        type: "plain_text",
                                        text: "High"
                                    },
                                    value: "high"
                                },
                                {
                                    text: {
                                        type: "plain_text",
                                        text: "Medium"
                                    },
                                    value: "medium"
                                },
                                {
                                    text: {
                                        type: "plain_text",
                                        text: "Low"
                                    },
                                    value: "low"
                                }
                            ]
                        },
                        optional: true
                    }
                ]
            })
        }
    },
    severity: context => {
        return {
            channel: context.channel_id,
            text: 'Logs Retrieved',
            blocks: JSON.stringify([
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: 'Logs'
                    }
                },
                {
                    type: 'divider'
                },
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: `${context.data}`
                    }
                },
                {
                    type: 'context',
                    elements: [
                        {
                            type: 'mrkdwn',
                            text: `*Urgency*: ${context.urgency}`
                        }
                    ]
                }
            ])
        }
    }
}