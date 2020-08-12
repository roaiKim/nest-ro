// Keep webpackChunkName short, for sake of shorter bundled JS name
// Every method returns: Promise<ModuleExportedData>

export class ModuleLoader {
  static noFound () {
    return import(/* webpackChunkName: "noFound" */ 'module/404')
  }

  static Home () {
    return import(/* webpackChunkName: "home" */ 'module/home')
  }

  static login () {
    return import(/* webpackChunkName: "login" */ 'module/login/index')
  }
  
  static user () {
    return import(/* webpackChunkName: "user" */ 'module/user-management')
  }

  static system () {
    return import(/* webpackChunkName: "system" */ 'module/system-management')
  }
}
