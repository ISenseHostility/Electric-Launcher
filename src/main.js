import { createApp } from 'vue'
import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { faThumbtack } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faBolt } from '@fortawesome/free-solid-svg-icons'
import { faIcons } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { faRotate } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

import App from './App.vue'
import HomeView from "@/views/HomeView";
import SettingsView from "@/views/SettingsView";
import AddSoftwareView from "@/views/AddSoftwareView";

library.add(faClockRotateLeft, faTrashCan, faThumbtack, faPlus, faMinus, faXmark, faGear, faPlay, faBolt, faIcons, faArrowLeft, faBars, faBarsStaggered, faDownload, faFolderOpen, faFloppyDisk, faRotate)

const routes = [
    { path:'/', component: HomeView },
    { path:'/settings/:id', component: SettingsView },
    { path:'/new', component: AddSoftwareView }
]

const router = createRouter({
    history: process.env.IS_ELECTRON ? createWebHashHistory() : createWebHistory(),
    routes
})

createApp(App)
    .use(router)
    .component('icon', FontAwesomeIcon)
    .mount('#app')
