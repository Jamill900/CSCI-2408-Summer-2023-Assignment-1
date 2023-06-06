onload = () => {
    let canvas = document.getElementById('webgl-canvas');
    let gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("Couldn't setup webgl");
        return;
    }

    let program = initShaders(gl, 'vertex-shader', 'fragment-shader');
    gl.useProgram(program);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);


    let stripMode = document.getElementById("strip-mode");
    let fanMode = document.getElementById("fan-mode");
    let eraseAll = document.getElementById("clear-canvas");

    stripMode.addEventListener("click", function () { changeRenderingMode('gl.TRIANGLE_STRIP') });
    fanMode.addEventListener("click", function () { changeRenderingMode('gl.TRIANGLE_FAN') });
    eraseAll.addEventListener("click", function() {  
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT); 
    });

    function changeRenderingMode(mode) {
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        if (mode == 'gl.TRIANGLE_STRIP') {

            let vertices = [
                -0.5, 0.5,  // Top-left
                -0.5, -0.5,  // Bottom-left
                0.5, 0.5,  // Top-right
                0.5, -0.5   // Bottom-right

            ];

            let vBuffer = gl.createBuffer();

            gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);

            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

            let vPosition = gl.getAttribLocation(program, 'vPosition');

            gl.vertexAttribPointer(
                vPosition,
                2,
                gl.FLOAT,
                false,
                0,
                0
            )

            gl.enableVertexAttribArray(vPosition);

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

            console.log("gl.TRIANGLE_STRIP")
        }

        else {

            let vertices = [
                -0.5, 0.5,  // Top-left
                -0.5, -0.5,  // Bottom-left
                0.5, -0.5,   // Bottom-right
                0.5, 0.5,  // Top-right

            ];

            let vBuffer = gl.createBuffer();

            gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);

            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

            let vPosition = gl.getAttribLocation(program, 'vPosition');

            gl.vertexAttribPointer(
                vPosition,
                2,
                gl.FLOAT,
                false,
                0,
                0
            )

            gl.enableVertexAttribArray(vPosition);

            gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

            console.log("gl.TRIANGLE_FAN")
        }
    }

}