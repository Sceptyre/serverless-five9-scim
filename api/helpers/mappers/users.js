const logger = require('../logger')
const pwgen = require('../pwgen')

module.exports = {
    toFive9(scimUser) {
        // Create object with blank values
        let user = {
                "generalInfo": {
                    "active": true,
                    "canChangePassword": false,
                    "EMail": null,
                    "fullName": null,
                    "mediaTypeConfig": {},
                    "mustChangePassword": false,
                    "userName": null
                },
                "roles": {
                    "agent": {
                        "permissions": [
                            { "type": 'MustPickSalesforceObjectForInteractionLog', "value": false },
                            { "type": 'ReceiveTransfer', "value": false },
                            { "type": 'MakeRecordings', "value": false },
                            { "type": 'SendMessages', "value": false },
                            { "type": 'CreateChatSessions', "value": false },
                            { "type": 'TrainingMode', "value": false },
                            { "type": 'CanSelectDisplayLanguage', "value": false },
                            { "type": 'CanViewMissedCalls', "value": false },
                            { "type": 'CanViewWebAnalytics', "value": false },
                            { "type": 'CanTransferChatsToAgents', "value": false },
                            { "type": 'CanTransferChatsToSkills', "value": false },
                            { "type": 'CanTransferEmailsToAgents', "value": false },
                            { "type": 'CanTransferEmailsToSkills', "value": false },
                            { "type": 'CannotRemoveCRM', "value": false },
                            { "type": 'CanCreateChatConferenceWithAgents', "value": false },
                            { "type": 'CanCreateChatConferenceWithSkills', "value": false },
                            { "type": 'CanTransferSocialsToAgents', "value": false },
                            { "type": 'CanTransferSocialsToSkills', "value": false },
                            { "type": 'ProcessVoiceMail', "value": false },
                            { "type": 'CallForwarding', "value": false },
                            { "type": 'CannotEditSession', "value": false },
                            { "type": 'TransferVoiceMail', "value": false },
                            { "type": 'DeleteVoiceMail', "value": false },
                            { "type": 'AddingToDNC', "value": false },
                            { "type": 'DialManuallyDNC', "value": false },
                            { "type": 'CreateCallbacks', "value": false },
                            { "type": 'PlayAudioFiles', "value": false },
                            { "type": 'CanWrapCall', "value": false },
                            { "type": 'CanPlaceCallOnHold', "value": false },
                            { "type": 'CanParkCall', "value": false },
                            { "type": 'SkipCrmInPreviewDialMode', "value": false },
                            { "type": 'ManageAvailabilityBySkill', "value": false },
                            { "type": 'BrowseWebInEmbeddedBrowser', "value": false },
                            { "type": 'ChangePreviewPreferences', "value": false },
                            { "type": 'CanRejectCalls', "value": false },
                            { "type": 'CanConfigureAutoAnswer', "value": false },
                            { "type": 'MakeTransferToAgents', "value": false },
                            { "type": 'MakeTransferToSkills', "value": false },
                            { "type": 'CreateConferenceWithAgents', "value": false },
                            { "type": 'CreateConferenceWithSkills', "value": false },
                            { "type": 'RecycleDispositionAllowed', "value": false },
                            { "type": 'MakeTransferToInboundCampaigns', "value": false },
                            { "type": 'MakeTransferToExternalCalls', "value": false },
                            { "type": 'CreateConferenceWithInboundCampaigns', "value": false },
                            { "type": 'CreateConferenceWithExternalCalls', "value": false },
                            { "type": 'MakeCallToSkills', "value": false },
                            { "type": 'MakeCallToAgents', "value": false },
                            { "type": 'MakeCallToExternalCalls', "value": false },
                            { "type": 'MakeCallToSpeedDialNumber', "value": false },
                            { "type": 'MakeTransferToSpeedDialNumber', "value": false },
                            { "type": 'CreateConferenceWithSpeedDialNumber', "value": false },
                            { "type": 'NICEEnabled', "value": false },
                            { "type": 'ScreenRecording', "value": false }
                        ]
                    },
                    "supervisor": {
                        "permissions": [
                            { "type": 'CampaignManagementStart', "value": false },
                            { "type": 'CampaignManagementStop', "value": false },
                            { "type": 'CampaignManagementReset', "value": false },
                            { "type": 'CampaignManagementResetDispositions', "value": false },
                            { "type": 'CampaignManagementResetListPositions', "value": false },
                            { "type": 'CampaignManagementResetAbandonCallRate', "value": false },
                            { "type": 'CanViewTextDetailsTab', "value": false },
                            { "type": 'Users', "value": false },
                            { "type": 'Agents', "value": false },
                            { "type": 'Stations', "value": false },
                            { "type": 'ChatSessions', "value": false },
                            { "type": 'Campaigns', "value": false },
                            { "type": 'CanAccessDashboardMenu', "value": false },
                            { "type": 'CallMonitoring', "value": false },
                            { "type": 'CampaignManagement', "value": false },
                            { "type": 'CanChangeDisplayLanguage', "value": false },
                            { "type": 'CanMonitorIdleAgents', "value": false },
                            { "type": 'CanSilentMonitorChats', "value": false },
                            { "type": 'AllSkills', "value": false },
                            { "type": 'CanManageComplianceData', "value": false },
                            { "type": 'CanMonitorEmails', "value": false },
                            { "type": 'CanTransferEmails', "value": false },
                            { "type": 'BillingInfo', "value": false },
                            { "type": 'BargeInMonitor', "value": false },
                            { "type": 'WhisperMonitor', "value": false },
                            { "type": 'ViewDataForAllAgentGroups', "value": false },
                            { "type": 'ReviewVoiceRecordings', "value": false },
                            { "type": 'EditAgentSkills', "value": false },
                            { "type": 'CanUseSupervisorSoapApi', "value": false },
                            { "type": 'CanAccessShowFields', "value": false },
                            { "type": 'NICEEnabled', "value": false }
                        ]
                    },
                    "reporting": {
                        "permissions": [
                            { "type": "CanScheduleReportsViaFtp", "value": false },
                            { "type": "CanAccessRecordingsColumn", "value": false },
                            { "type": "NICEEnabled", "value": false },
                            { "type": "CanViewStandardReports", "value": false },
                            { "type": "CanViewCustomReports", "value": false },
                            { "type": "CanViewScheduledReports", "value": false },
                            { "type": "CanViewRecentReports", "value": false },
                            { "type": "CanViewRelease7Reports", "value": false },
                            { "type": "CanViewCannedReports", "value": false },
                            { "type": "CanViewDashboards", "value": false },
                            { "type": "CanViewAllSkills", "value": false },
                            { "type": "CanViewAllGroups", "value": false },
                            { "type": "CanViewSocialReports", "value": false }
                        ]
                    }
                }
        }

        // Map values
        user.generalInfo.EMail = scimUser.emails ? scimUser.emails.find(i=>i.type=='work').value : null
        user.generalInfo.active = scimUser.active

        user.generalInfo.fullName = scimUser.displayName
        user.generalInfo.firstName = scimUser.name.givenName
        user.generalInfo.lastName = scimUser.name.familyName
        user.generalInfo.userName = scimUser.userName

        user.generalInfo.federationId = scimUser.userName

        // Get unecessary roles
        user.rolesToRemove = ["Agent", "Supervisor", "Reporting"].filter(role => !(scimUser.roles.join("-").toLowerCase().includes(role.toLowerCase() + ":")))
        user.rolesToRemove.forEach(role => {
            // Iterate and remove roles from mapped object
            if(user.roles[role.toLowerCase()]) {
                delete user.roles[role.toLowerCase()]
            }
        })

        // Map roles
        scimUser.roles.forEach(perm => {
            let p = perm.split(":")

            try {
                // Set permission value
                user
                    .roles[p[0]] // Current role type agent/supervisor/reporting
                    .permissions 
                    .find(i => i.type == p[1]) // find permissions that matches current permission iteration
                    .value = true // Set true
            } catch {
                logger.warn(`Unable to map permission: ${perm}`)
            }
        })

        // Define password if provided password
        user.generalInfo.password = pwgen()

        return user
    },

    toScim(user) {
        let scimUser = {
            "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
            "id": null,
            "userName": null,
            "name": {
                "givenName": null,
                "familyName": null
            },
            "displayName": null,
            "emails":
                [{
                    "primary": true,
                    "value": null,
                    "type": "work"
                }],
            "active": false,
            "groups": [],
            "meta": {
                "resourceType": "User",
                "location": null
            },
            "roles": []
        }
        
        scimUser.active = user.generalInfo.active

        scimUser.id = user.generalInfo.id

        scimUser.name.givenName = user.generalInfo.firstName || ""
        scimUser.name.familyName = user.generalInfo.lastName || ""
        scimUser.displayName = user.generalInfo.fullName || ""

        scimUser.emails[0].value = user.generalInfo.EMail || ""
        scimUser.userName = user.generalInfo.userName

        scimUser.roles = [].concat.apply([], Object.keys(user.roles).filter(i=>user.roles[i]).map(key=> {
            return user.roles[key].permissions.filter(perm=>perm.value).map(perm=> {
                return `${key}:${perm.type}`
            })
        }))

        return scimUser
    }
}