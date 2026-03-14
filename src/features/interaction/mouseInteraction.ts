import * as THREE from 'three'
import { buildUrl } from '@/utils/buildUrl'
import { loadVRMAnimation } from '@/lib/VRMAnimation/loadVRMAnimation'
import { Model } from '../vrmViewer/model'
import { MouseTracker } from '../interaction/mouseTracker'
// import * as glob from 'glob';

export class MouseInteraction {
      private _raycaster: THREE.Raycaster
      private _model: Model
      private _camera: THREE.Object3D
      private _mouseTracker: MouseTracker

      constructor(model: Model, camera: THREE.Object3D) {
            this._model = model
            this._camera = camera
            this._mouseTracker = new MouseTracker(camera)
            this._raycaster = new THREE.Raycaster()
            window.addEventListener('click',this._onMouseClick.bind(this));
            this._model.eventEmitter.on('animationFinished', this.defaultAnimation.bind(this))
 
      }
    
      private _onMouseClick(event: MouseEvent) {
            if (this.isHit()) {
                  const files = [
                  '/animations/interaction/VRMA_01.vrma',
                  '/animations/interaction/VRMA_02.vrma',
                  '/animations/interaction/VRMA_03.vrma',
                  '/animations/interaction/VRMA_04.vrma',
                  '/animations/interaction/VRMA_05.vrma',
                  '/animations/interaction/VRMA_06.vrma',
                  '/animations/interaction/VRMA_07.vrma',
                  '/animations/interaction/idle_tired.vrma',
                  ]
                  const file = files[Math.floor(Math.random() * files.length)]
                  this.interaction(file)
            }
      }

      private isHit(): boolean {
            this._raycaster.setFromCamera(this._mouseTracker.getMousePositionInScreen(), this._camera)
            const intersects = this._raycaster.intersectObjects(this._model.vrm?.scene.children || [])
            console.log(intersects)
            return intersects.length > 0
      }

      private async interaction(fileName: string) {
            const vrma = await loadVRMAnimation(buildUrl(fileName))
            if (vrma) this._model.loadAnimationAtOnce(vrma)
      }

      private async defaultAnimation() {
            const vrma = await loadVRMAnimation(buildUrl('/animations/idle_loop.vrma'))
            if (vrma) this._model.loadAnimation(vrma)
      }
}