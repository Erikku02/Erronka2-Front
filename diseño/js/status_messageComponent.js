Vue.component('status_message_top', {
    props: ['errorMessageTop', 'statusMessageTop'],
    template:
        `<div>
            <div id="error-message" class="alert alert-danger justify-content-between" v-if="errorMessageTop" :class="{ 'fade-out': !errorMessageTop }">
                {{ errorMessageTop }}
            </div>
            <div id="status-message" class="alert alert-success justify-content-between" v-if="statusMessageTop" :class="{ 'fade-out': !statusMessageTop }">
                {{ statusMessageTop }}
            </div>
        </div>
        `
});


Vue.component('status_message_botton', {
    props: ['errorMessageBotton', 'statusMessageBotton'],
    template:
        `<div>
            <div id="error-message" class="col-sm-6 col-lg-3 alert alert- justify-content-between" v-if="errorMessageBotton" :class="{ 'fade-out': !errorMessageBotton }">
                {{ errorMessageBotton }}
            </div>
            <div id="status-message" class="alert alert-success justify-content-between"
                v-if="statusMessageBotton" :class="{ 'fade-out': !statusMessageBotton }">
                {{ statusMessageBotton }}
            </div>
        </div>
        `
});