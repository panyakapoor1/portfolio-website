void main() {
  float dist = distance(gl_PointCoord, vec2(0.5));
  float alpha = 1.0 - smoothstep(0.35, 0.5, dist);
  gl_FragColor = vec4(0.8, 0.75, 1.0, alpha * 0.7);
}
