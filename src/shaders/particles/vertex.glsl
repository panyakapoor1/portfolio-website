uniform float uTime;
uniform float uScrollProgress;
uniform float uSize;
attribute float aScale;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  modelPosition.y += uScrollProgress * 2.0;
  modelPosition.x += sin(uTime * 0.3 + modelPosition.y) * 0.08;
  modelPosition.z += cos(uTime * 0.2 + modelPosition.x) * 0.08;
  vec4 viewPosition = viewMatrix * modelPosition;
  gl_Position = projectionMatrix * viewPosition;
  gl_PointSize = uSize * aScale * (1.0 / -viewPosition.z);
}
