import * as THREE from 'three'

export class MouseTracker {
  private _mouse: THREE.Vector2
  private _raycaster: THREE.Raycaster
  private _camera: THREE.Object3D

  constructor(camera: THREE.Object3D) {
    this._mouse = new THREE.Vector2()
    this._raycaster = new THREE.Raycaster()
    this._camera = camera

    window.addEventListener('mousemove', this._onMouseMove.bind(this))
  }

  private _onMouseMove(event: MouseEvent) {
    // マウス座標を正規化 (-1 ~ 1)
    this._mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    this._mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  }

  public getMousePositionInScreen(): THREE.Vector2 {
    return this._mouse.clone()
  }

  public getMousePositionInWorld(): THREE.Vector3 {
    // マウス位置を3D空間に変換
    this._raycaster.setFromCamera(this._mouse, this._camera)
    const intersects = this._raycaster.ray.at(10, new THREE.Vector3()) // 距離10の位置を取得
    return intersects
  }
}