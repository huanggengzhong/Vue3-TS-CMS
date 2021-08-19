import { App } from 'vue'
import registerElement from './register-element'
export function globelRegister(app: App): void {
  app.use(registerElement)
}
