<script lang="ts">
  export let width = "1em";
  export let height = "1em";
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  {width}
  {height}
  viewBox="0 0 24 24"
  {...$$props}
>
  <circle cx="12" cy="12" r="0" fill="#a664e8">
    <animate
      id="svgSpinnersPulseMultiple0"
      fill="freeze"
      attributeName="r"
      begin="0;svgSpinnersPulseMultiple2.end"
      calcMode="spline"
      dur="1.2s"
      keySplines=".52,.6,.25,.99"
      values="0;11"
    />
    <animate
      fill="freeze"
      attributeName="opacity"
      begin="0;svgSpinnersPulseMultiple2.end"
      calcMode="spline"
      dur="1.2s"
      keySplines=".52,.6,.25,.99"
      values="1;0"
    />
  </circle>
  <circle cx="12" cy="12" r="0" fill="#a664e8">
    <animate
      id="svgSpinnersPulseMultiple1"
      fill="freeze"
      attributeName="r"
      begin="svgSpinnersPulseMultiple0.begin+0.2s"
      calcMode="spline"
      dur="1.2s"
      keySplines=".52,.6,.25,.99"
      values="0;11"
    />
    <animate
      fill="freeze"
      attributeName="opacity"
      begin="svgSpinnersPulseMultiple0.begin+0.2s"
      calcMode="spline"
      dur="1.2s"
      keySplines=".52,.6,.25,.99"
      values="1;0"
    />
  </circle>
  <circle cx="12" cy="12" r="0" fill="#a664e8">
    <animate
      id="svgSpinnersPulseMultiple2"
      fill="freeze"
      attributeName="r"
      begin="svgSpinnersPulseMultiple0.begin+0.4s"
      calcMode="spline"
      dur="1.2s"
      keySplines=".52,.6,.25,.99"
      values="0;11"
    />
    <animate
      fill="freeze"
      attributeName="opacity"
      begin="svgSpinnersPulseMultiple0.begin+0.4s"
      calcMode="spline"
      dur="1.2s"
      keySplines=".52,.6,.25,.99"
      values="1;0"
    />
  </circle>
</svg>
