<script>
  import L from 'leaflet';
  import { getContext } from 'svelte';
  let classNames = undefined;
  export { classNames as class };
  export let tooltip = undefined;
  let layer = getContext('layer')();
  
	function createTooltip(tooltipElement) {
    tooltip = L.tooltip().setContent(tooltipElement);    
    layer.bindTooltip(tooltip);
    return {
      destroy() {
        if (tooltip) {
          layer.unbindTooltip();
          tooltip.remove();
          tooltip = undefined;
        }
      },
    };
  }
</script>

<div hidden>
  <div use:createTooltip class={classNames}>
    <slot />
  </div>
</div>