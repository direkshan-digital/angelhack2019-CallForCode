
/* global getAssetRegistry getFactory emit */

/**
 * RequestAssistance transaction processor function.
 * @param {org.haven.basic.RequestAssistance} tx The RequestAssistance transaction instance.
 * @transaction
 */
async function requestAssistance(tx) {  // eslint-disable-line no-unused-vars

    const hospitalFrom = tx.getParticipant()

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('org.haven.basic', 'EmergencyRequested');
    event.participant = hospitalFrom;
    emit(event);
}
