import * as Cesium from 'cesium'

// export default class FlowLineAppearance extends Cesium.PolylineMaterialAppearance {
//   constructor(speed: number) {
//     super({
//       material: new Cesium.Material({
//         fabric: {
//           type: 'FlowLine',
//           uniforms: {
//             u_time: 0,
//             light_color: new Cesium.Color(0.5, 1, 1),
//           },
//         },
//       }),
//       fragmentShaderSource: `
//         in vec2 v_st;
//         void main() {
//           czm_materialInput materialInput;

//           vec2 st = v_st;
//           vec3 color = light_color_1.rgb;

//           float start = 0.0;
//           float end = 0.5;

//           float step = fract(u_time_0 * 0.4) * (1. + end) - end;

//           start += step;
//           end += step;

//           if(st.x > start && st.x < end) {
//             float d = 1. - (st.x - start) / (end - start);
//             color = mix(color, color * 0.6, d*d);
//           } else {
//             color = color * 0.6;
//           }

//           out_FragColor = vec4(color, 1.0);
//         }
//       `,
//     })

//     const task = (time: number) => {
//       this.material.uniforms.u_time = time * speed
//       requestAnimationFrame(task)
//     }
//     requestAnimationFrame(task)
//   }
// }

export default class FlowLineAppearance extends Cesium.PolylineMaterialAppearance {
  constructor(speed: number) {
    super({
      material: new Cesium.Material({
        fabric: {
          type: 'FlowLine',
          uniforms: {
            u_time: 0,
            light_color: new Cesium.Color(0.5, 1, 1),
          },
          source: `
            czm_material czm_getMaterial(czm_materialInput materialInput) {
              czm_material material = czm_getDefaultMaterial(materialInput);
              vec2 st = materialInput.st;
              vec3 color = light_color_1.rgb;

              float start = 0.0;
              float end = 0.5;

              float step = fract(u_time_0 * 0.4) * (1. + end) - end;

              start += step;
              end += step;

              if(st.x > start && st.x < end) {
                float d = 1. - (st.x - start) / (end - start);
                color = mix(color, color * 0.6, d*d);
              } else {
                color = color * 0.6;
              }

              material.diffuse = color; 
              
              return material;
            }
          `
        },
      }),
      fragmentShaderSource: `
        in vec2 v_st;
        void main() {
          czm_materialInput materialInput;

          vec2 st = v_st;
          vec3 color = light_color_1.rgb;

          float start = 0.0;
          float end = 0.5;

          float step = fract(u_time_0 * 0.4) * (1. + end) - end;

          start += step;
          end += step;

          if(st.x > start && st.x < end) {
            float d = 1. - (st.x - start) / (end - start);
            color = mix(color, color * 0.6, d*d);
          } else {
            color = color * 0.6;
          }

          out_FragColor = vec4(color, 1.0);
        }
      `,
    })

    const task = (time: number) => {
      this.material.uniforms.u_time = time * speed
      requestAnimationFrame(task)
    }
    requestAnimationFrame(task)
  }
}

