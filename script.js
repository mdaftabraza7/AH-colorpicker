document.addEventListener('DOMContentLoaded', () => {
    const colorPicker = new iro.ColorPicker("#colorPicker", {
        width: 180,
        color: "#ab0089",
        borderWidth: 2
    });
const colorIndicator = document.getElementById('color-indicator');
    const hexInput = document.getElementById('hexInput');
    const rgbInput = document.getElementById('rgbInput');
    const rgbaInput = document.getElementById('rgbaInput');
    const hslInput = document.getElementById('hslInput');
    const alphaSlider = document.getElementById('alphaSlider');
    const alphaValue = document.getElementById('alphaValue');
    let alphaValueNumber = 1;
    function updateColorInputs(color) {
        hexInput.value = color.hexString;
        rgbInput.value = `${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}`;
        updateRGBAInput(color);
        hslInput.value = `${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%`;
    }
    function updateColorValues(color) {
        alphaValueNumber = parseFloat(alphaSlider.value);
        const rgbaArray = [color.rgb.r, color.rgb.g, color.rgb.b, alphaValueNumber];
        colorIndicator.style.backgroundColor = `rgba(${rgbaArray.join(', ')})`;
        document.querySelector('#currentColorHex span').textContent = color.hexString;
        document.querySelector('#currentColorRGB span').textContent = `${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}`;
        document.querySelector('#currentColorRGBA span').textContent = rgbaArray.join(', ');
        document.querySelector('#currentColorHSL span').textContent = `${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%`;
        alphaValue.textContent = alphaValueNumber.toFixed(2);
    }
    function updateRGBAInput(color) {
        rgbaInput.value = `${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${alphaSlider.value}`;
    }
    colorPicker.on('color:change', (color) => {
        updateColorInputs(color);
        updateColorValues(color);
    });
    hexInput.addEventListener('change', () => {
        colorPicker.color.hexString = hexInput.value;
    });
    rgbInput.addEventListener('change', () => {
        const rgbValues = rgbInput.value.split(',').map(val => parseInt(val.trim()));
        colorPicker.color.rgb = { r: rgbValues[0], g: rgbValues[1], b: rgbValues[2] };
    });
    rgbaInput.addEventListener('change', () => {
        const rgbaValues = rgbaInput.value.split(',').map(val => parseFloat(val.trim()));
        colorPicker.color.rgb = { r: rgbaValues[0], g: rgbaValues[1], b: rgbaValues[2] };
        alphaSlider.value = rgbaValues[3];
        alphaValue.textContent = rgbaValues[3].toFixed(2);
        updateColorValues(colorPicker.color);
    });
    hslInput.addEventListener('change', () => {
        const hslValues = hslInput.value.split(',').map(val => parseFloat(val.trim()));
        colorPicker.color.hsl = { h: hslValues[0], s: hslValues[1], l: hslValues[2] };
    });
    alphaSlider.addEventListener('input', () => {
        alphaValue.textContent = alphaSlider.value;
        updateRGBAInput(colorPicker.color);
        updateColorValues(colorPicker.color);
    });
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetText = document.querySelector(btn.getAttribute('data-target') + ' span').textContent;
            navigator.clipboard.writeText(targetText).then(() => {
                alert('Copied: ' + targetText);
            });
        });
    });
});