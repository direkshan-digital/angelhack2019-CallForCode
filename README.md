# Haven Disaster Relief Network

> This is the network for disaster relief service providers, which network members can use to coordinate relief efforts before, during or after a disaster hits.

This business network defines:

**Participant**
`Hospital`

**Asset**
`SpecialNeedsPatient`

**Transaction**
`RequestAssistance`
`Match`
`EvacuatePatients`
`AcceptRelocatedPatients`

**Event**
`EmergencyRequested`
`HelpIsOnTheWay`
`RelocationInProgress`
`RelocationCompleted`

`SpecialNeedsPatient`s are located at a `Hospital`. Before, during or after a disaster hists, `Hospital` in the impact zone submits `RequestAssistance` transaction to ask for help in evacuating `SpecialNeedsPatient`s to a safe location, which would be another `Hospital` that's out of the impacted area. The `RequestAssistance` transaction emits a `EmergencyRequested` event that notifies application.

Application matches the requirements of requesting `Hospital` with the capabilities of other `Hospital`s that are in SAFE zone. Once the match(es) is/are found, application submits `Match` transaction to let the parties involved know, so that they can prepare for evacuation. The `Match` transaction emits `HelpIsOnTheWay` event that application uses to update the map.

Once the assistance vehicle reaches the requesting `Hospital`, evacuation begins and the `Hospital` submits `EvacuatePatients` transaction. This transaction emits `RelocationInProgress` event that notifies the application, which in-turn updates the map.

When `SpecialNeedsPatient`s reach the designated relocation centers, accepting `Hospital` submits `AcceptRelocatedPatients` transaction. It emits `RelocationCompleted` event that application uses to update the mark and SAFE list.

To test this Business Network Definition in the **Test** tab:

Create a `Hospital` participant:

```
{
  "$class": "org.haven.basic.Hospital",
  "hospitalId": "0339",
  "org": {
    "$class": "org.haven.basic.Organization",
    "name": "New York Presbyterian Hospital",
    "role": "Hospital",
    "address": {
      "$class": "org.haven.basic.UnitedStatesAddress",
      "zipcode": "10019",
      "street": "51 W 51st St, #385",
      "city": "New York",
      "country": "USA"
    },
    "Phone": {
      "$class": "org.haven.basic.Phone",
      "number": "(212) 326-8475",
      "type": "Work"
    },
    "contactPerson": {
      "$class": "org.haven.basic.Contact",
      "isPrimary": true,
      "firstName": "Dr",
      "lastName": "Strange",
      "email": "dr.strange@mcu.ny",
      "phoneNumber": {
        "$class": "org.haven.basic.Phone",
        "number": "(212) 123 4567",
        "type": "Mobile"
      }
    }
  },
  "isActive": false,
  "facilities": [
    "Nursery","ICU","Pharmacy"
  ],
  "capabilities": [
    {
      "$class": "org.haven.basic.Capability",
      "Number": 500,
      "type": "Bed"
    }
  ]
}
```

Create a `SpecialNeedsPatient` asset:

```
{
  "$class": "org.haven.basic.SpecialNeedsPatient",
  "patientId": "0226",
  "patient": {
    "$class": "org.haven.basic.Patient",
    "hasSpecialNeeds": true,
    "firstName": "Mr.",
    "lastName": "Smith",
    "email": "abc@g.co",
    "phoneNumber": {
      "$class": "org.haven.basic.Phone",
      "number": "(000) 000 0000",
      "type": "Work"
    }
  },
  "hospital": "resource:org.haven.basic.Hospital#0339"
}
```

Submit a `RequestAssistance` transaction:

```
{
  "$class": "org.haven.basic.RequestAssistance",
  "patient": "resource:org.haven.basic.SpecialNeedsPatient#patientId:1",
  "requirements": []
}
```

After submitting this transaction, you should now see the transaction in the Transaction Registry and that a `EmergencyRequested` has been emitted.
