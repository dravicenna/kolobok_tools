async function calc() {
    var e = document.getElementById('hash').value;
    console.log(e)
    const t = e.length;
    const n = e.length / 2;
    const l = [e.slice(0, 2), e.slice(t - 2, t)];
    const r = [e.slice(n - 2, n), e.slice(n, n + 2)];

    var speed = Math.abs(parseInt(l[0], 16) - parseInt(l[1], 16));
    var stealth = ((255 - Math.abs(parseInt(r[0], 16) - parseInt(r[1], 16))) / 255).toFixed(2);

    console.log(stealth)
    console.log(speed)
    let genome_info = 'Genome '+ e
    let speed_stealth = 'STEALTH: ' +  stealth + ' SPEED: ' + speed
    document.getElementById('genname').textContent = genome_info;
    document.getElementById('genresponse').textContent = speed_stealth;
    }