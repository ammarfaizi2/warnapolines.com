// https://codepen.io/cssacropolis/pen/QwdzOE

var self = window;

(function (self) {

    var container, scene, camera, renderer, Obj3D, stats, concentricsParticles = [],
        mouse = {
            x: 0,
            y: 0,
            lastCameraX: 0,
            lastCameraY: 0,
            lastCameraZ: 500
        },
        theta = 0,
        radius = 400;

    // Dat GUI default values
    var particles = 200,
        speed = 0.10,
        orbit = 30,
        depth = 1000,
        interactive = true,
        showStats = false;

    /*
     * Settings.
     */

    var Settings = function () {
        // Particle Config

        this.particles = 150;
        this.speed = 0.10;
        this.orbit = 30;
        this.depth = 1000;
        this.interactive = false;
        this.showStats = false;
        this.changeParticles = function (value) {

            // Reset 'em all
            concentricsParticles = [];
            scene.remove(Obj3D);

            Obj3D = new THREE.Object3D();
            scene.add(Obj3D);

            var geometry = new THREE.Geometry();
            geometry.dynamic = true;

            particles = value;

            populate(geometry);

        };

        this.changeSpeed = function (value) {

            [].forEach.call(concentricsParticles, function (concentrics, index) {

                concentrics.speed = value - 0.15 + Math.random() * value;

            });

        };

        this.changeOrbit = function (value) {

            orbit = value;

        };

        this.changeDepth = function (value) {

            depth = value;

        };

        this.changeDepth = function (value) {

            depth = value;

        };

        this.enableInteractivity = function (value) {

            interactive = value;

        };

        this.enableStats = function (value) {

            showStats = value;

            showStats ? stats.domElement.style.visibility = 'visible' : stats.domElement.style.visibility = 'hidden';

        };

    };

    var context2D = function (context) {

        context.save();
        context.beginPath();
        context.arc(0, 0, 1, 0, Math.PI * 2);
        context.fill();
        context.restore();

    }

    window.addEventListener ? window.addEventListener('load', init, false) : window.onload = init;

    /*
     * Init.
     */

    function init() {

        var settings = new Settings();
        // var GUI = new dat.GUI();

        // Dat GUI main
        // GUI.add(settings, 'particles').min(100).max(1000).onChange(settings.changeParticles);
        // GUI.add(settings, 'speed').min(0.10).max(0.30).onChange(settings.changeSpeed);
        // GUI.add(settings, 'orbit').min(0).max(100).onChange(settings.changeOrbit);
        // GUI.add(settings, 'depth').min(100).max(1000).onChange(settings.changeDepth);
        // GUI.add(settings, 'interactive').onChange(settings.enableInteractivity);
        // GUI.add(settings, 'showStats').onChange(settings.enableStats);

        var body = document.querySelector('body');

        container = document.createElement('div');

        container.width = innerWidth;
        container.height = innerHeight;

        container.style.position = 'absolute';
        container.style.top = 0;
        container.style.bottom = 0;
        container.style.left = 0;
        container.style.right = 0;
        container.style.zIndex = -1;
        container.style.overflow = 'hidden';

        // Background Color

        // container.style.background = '-webkit-linear-gradient(to top right, #0055ff, #00007f)';
        // container.style.background = '-moz-linear-gradient(to top right, #0055ff, #00007f)';
        // container.style.background = '-ms-linear-gradient(to top right, #0055ff, #00007f)';
        // container.style.background = '-o-linear-gradient(to top right, #0055ff, #00007f)';
        // container.style.background = 'linear-gradient(to top right, #0055ff, #00007f)';

        document.body.appendChild(container);

        // Setup
        camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 5000);
        camera.position.z = depth;

        scene = new THREE.Scene();
        scene.add(camera);

        renderer = new THREE.CanvasRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        Obj3D = new THREE.Object3D();
        scene.add(Obj3D);

        var geometry = new THREE.Geometry();
        geometry.dynamic = true;

        populate(geometry);

        // Stats
        stats = new Stats();

        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';

        container.appendChild(stats.domElement);

        // Hide stats
        settings.enableStats();

        // Listeners
        document.addEventListener('mousemove', onMouseMove, false);
        document.addEventListener('touchmove', onTouchMove, false);

        window.onresize = onResize;

        render();

    }

    /*
     * Let's create the fluctuating particles.
     */

    function populate(geometry) {

        for (var quantity = 0, len = particles; quantity < len; quantity++) {

            var particle = new THREE.Particle(new THREE.ParticleCanvasMaterial(({
                color: 0xdfdfdf,
                opacity: Math.max(Math.random(), 0.3),
                program: context2D
            })));

            particle.position.x = Math.random() * 3000 - 1500;
            particle.position.y = Math.random() * 3000 - 1500;
            particle.position.z = Math.random() * 3000 - 1500;

            particle.scale.x = particle.scale.y = 10;

            concentricsParticles.push({

                originX: particle.position.x,
                originY: particle.position.y,
                angle: 0,
                speed: 0.05 + Math.random() * 0.20,

                particle: particle

            });

            geometry.vertices.push(particle.position);
            Obj3D.add(particle);

        }

    }

    /*
     * Mouse move event.
     */

    function onMouseMove(event) {

        event.preventDefault();

        mouse.x = event.pageX - (window.innerWidth * 0.5);
        mouse.y = event.pageY - (window.innerHeight * 0.5);

    }

    /*
     * Touch move event.
     */

    function onTouchMove(event) {

        event.preventDefault();

        var touch = event.touches[0];

        if (event.touches.length === 1) {

            mouse.x = touch.pageX - (window.innerWidth * 0.5);
            mouse.y = touch.pageY - (window.innerHeight * 0.5);

        }

    }

    /*
     * On resize event.
     */

    function onResize(event) {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

    }

    /*
     * Render the animation.
     */

    function render() {

        requestAnimationFrame(render);

        [].forEach.call(concentricsParticles, function (concentrics, index) {

            concentrics.particle.position.x = concentrics.originX + Math.sin(index + concentrics.angle) * orbit;
            concentrics.particle.position.y = concentrics.originY + Math.cos(index + concentrics.angle) * orbit;

            concentrics.particle.scale.x = concentrics.particle.scale.y = 1 + Math.sin(concentrics.angle * 0.5) * 10;

            concentrics.angle += concentrics.speed;

        });

        if (!!interactive) {

            camera.position.x += (mouse.x - camera.position.x) * 0.05;
            camera.position.y += (-mouse.y - camera.position.y) * 0.05;
            camera.position.z = mouse.lastCameraZ;

            // Save the current position to be used as base for non-interactive mode
            mouse.lastCameraX = camera.position.x;
            mouse.lastCameraY = camera.position.y;

            theta = 0;

        } else {

            theta += 1;

            camera.position.x = mouse.lastCameraX + radius * Math.sin(theta * Math.PI / 360);
            camera.position.y = mouse.lastCameraY + radius * Math.sin(theta * Math.PI / 360);

        }

        mouse.lastCameraZ += (depth - mouse.lastCameraZ) * 0.08;
        camera.position.z = mouse.lastCameraZ + radius * Math.cos(theta * Math.PI / 360);

        camera.lookAt(scene.position);

        stats.update();

        renderer.render(scene, camera);

    }

})(self);