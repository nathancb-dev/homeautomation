let devicesUp = [];

module.exports = {
    setDeviceConnected(clientId, deviceInfoId) {

        if (devicesUp.findIndex(x => x.clientId === clientId && x.deviceInfoId === deviceInfoId) > -1)
            return;

        devicesUp.push(
            clientId,
            deviceInfoId
        );

    },
    setDeviceDisconnected(clientId) {
        devicesUp = devicesUp.filter(x => x.clientId !== clientId)
    }
}