const stepData = [
    {
        title: 'Choose offer',
        description: 'Choose offer'
    },
    {
        title: "Set trigger for offer",
        description: "Set trigger for offer"
    },
    {
        title: "Availability",
        description: "To whom the offer appears and who can be invited to slash"
    },
    {
        title: "Choose style",
        description: "what is offer looks like on you product page"
    }
]

const radioData = [
   {
        title: '$0 offer',
        value: 0
   },
   {
       title: 'Take a half',
       value: 1
   },
   {
       title: 'discount as you go',
       value: 2
   }
]

const AvailabilityData = {
    offer: {
        title: 'To whom the offer appears',
        list: [
            {
                label: 'Only show to signed in customers',
                value: 'Only show to signed in customers'
            },
            {
                label: 'Exclude signed in customers with specific tags',
                value: 'Exclude signed in customers with specific tags'
            }
        ]
    },
    slash: {
        title: 'Who can be invited to slash',
        list:[
            {
                label: 'Only sign in customers can slash',
                value: 'Only sign in customers can slash'
            },
            {
                label: 'Allow a customer to slash once a day',
                value: 'Allow a customer to slash once a day'
            },
            {
                label: 'Exclude signed in customers with specific tags',
                value: 'Exclude signed in customers with specific tags'
            }
        ]
    }
}


export {
    stepData,
    radioData,
    AvailabilityData
}