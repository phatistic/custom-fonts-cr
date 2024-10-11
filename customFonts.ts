//% color="#16626B" icon="\uf031"
namespace Fonts {
    
    let ligs: string[][] = [][]
    let ligages: Image[][] = [][]
    let ligwidth: number[][] = [][]
    let letterspace: number = 1

    export function drawTransparentImage(src: Image, to: Image, x: number, y: number) {
        if (!src || !to) {
            return;
        }
        to.drawTransparentImage(src, x, y);
    }

    //%block="set $glyph to $imgi=screen_image_picker and staying $notmove and store to $tid and erasecol $bcol and spacebar $scol"
    export function SetCharecter(glyph: string, imgi: Image, notmove: boolean, tid: number, bcol: number, scol: number){
        let nid = tid
        let scnwidt = true
        let scwidt = false
        let wi = 0
        let wj = 0
        let si = 0
        let imgj = image.create(1, 1)
        if (bcol > 0 && bcol < 16){
            imgi.replace(bcol, 0)
        }
        for (let xw = 0 ; xw < imgi.width ; xw++){
            si = 0
            for (let yh = 0 ; yh < imgi.height ; yh++){
                if (scnwidt && ( imgi.getPixel(xw, yh) != 0 || (scwidt && imgi.getPixel( xw + 1 , yh) != 0 ))) {
                    si += 1
                }

            }
            if (scnwidt) {
                if (scwidt) {
                    if (si <= 0){
                        wj = xw
                        scnwidt = false
                    }

                } else {
                    if (si > 0) {
                        wi = xw
                        scwidt = true
                    }

                }
            }
        }
        imgj = image.create(Math.abs(wj - wi), imgi.height)
        drawTransparentImage(imgi, imgj, 0 - wi, 0)
        if (scol > 0 && scol < 16){
            imgj.replace(scol, 0)
        }
        if (tid >= ligs.length){ 
            ligs.push[]
            ligages.push[]
            ligswidth.push[]
            nid = ligs.length - 1
            }
        if (ligs[nid].indexOf(glyph) == -1) {
            ligs[nid].push(glyph)
            ligages[nid].push(imgj)
            if (notmove) {
                ligwidth[nid].push(0)
            } else {
                ligwidth[nid].push(imgj.width)
            }
        } else {
            ligages[nid][ligs.indexOf(glyph)] = imgj
            if (notmove) {
                ligwidth[nid][ligs.indexOf(glyph)] = 0
            } else {
                ligwidth[nid][ligs.indexOf(glyph)] = imgj.width
            }
            
        }
    }


    //%block="number of glyphs in $tid"
    export function NumOfGlyphs(tid: number): number {
        let nid = tid
        if (nid < ligs.length) {
            return ligs[nid].length

        }
        nid = ligs.length - 1
        return ligs[nid].length
    }

    //%block="array of glyph images in $tid"
    export function ImageArray(tid: number): Image[] {
        let nid = tid
        if (nid < ligages.length) {
            return ligages[nid]
        }
        nid = ligages.length - 1
        return ligages[nid]
    }

    //%block="array of glyphs in $tid"
    export function GlyphArray(tid: number): String[] {
        let nid = tid
        if (nid < ligs.length) {
            return ligs[nid]
        }
        nid = ligs.length - 1
        return ligs[nid]
    }

    //%block="create the image of $input in $tid"
    export function SetImage(input: string, tid: number) {
        let nid = tid
        if (nid >= ligs.length) {
            nid = ligs.length - 1
        }
        let heig = 0
        let widt = 0
        let curwidt = 0
        let uwidt = 0
        let swidt = 0
        let nwidt = 0
        let lwidt: number[] = []

        for (let currentletter = 0; currentletter < input.length; currentletter++) {

            if (!(ligs[nid].indexOf(input.charAt(currentletter)) == -1)) {
                heig = Math.max(heig, ligages[nid][(ligs[nid].indexOf(input.charAt(currentletter)))].height)
            }
        }

        for (let currentletter2 = 0; currentletter2 < input.length; currentletter2++) {
            if (!(ligs[nid].indexOf(input.charAt(currentletter2)) == -1)) {
                uwidt = ligages[nid][(ligs[nid].indexOf(input.charAt(currentletter2)))].width
                
                lwidt.push(uwidt)
                if (ligwidth[nid][(ligs[nid].indexOf(input.charAt(currentletter2) + 1))] == 0) {
                    swidt = uwidt
                } else {
                    swidt = 0
                }
                widt += Math.abs(uwidt - swidt)
            } else if (input.charAt(currentletter2) == " ") {
                widt += 3*letterspace
            }
            widt += 1
        }

        let output = image.create(widt, heig)
        for (let currentletter3 = 0; currentletter3 < input.length; currentletter3++) {

            if (!(ligs[nid].indexOf(input.charAt(currentletter3)) == -1)) {
                uwidt = ligwidth[nid][(ligs[nid].indexOf(input.charAt(currentletter3)))]
                
                if (ligwidth[nid][(ligs[nid].indexOf(input.charAt(currentletter3)))] == 0) {
                    nwidt = ligages[nid][(ligs[nid].indexOf(input.charAt(currentletter3)))].width
                } else {
                    nwidt = 0
                }
                drawTransparentImage(ligages[nid][(ligs[nid].indexOf(input.charAt(currentletter3)))], output, curwidt - (nwidt - (Math.abs(nwidt - (nwidt - swidt)))), 0 + (heig - ligages[nid][(ligs[nid].indexOf(input.charAt(currentletter3)))].height))
                if (ligwidth[nid][(ligs[nid].indexOf(input.charAt(currentletter3 + 1)))] == 0) {
                    swidt = nwidt
                } else {
                    swidt = 0
                }
                if (nwidt == 0) {
                    curwidt += letterspace
                } else if (ligwidth[nid][(ligs[nid].indexOf(input.charAt(currentletter3 + 1)))] > 0)) {
                    curwidt += letterspace
                }
                curwidt += Math.abs(uwidt - swidt)
            } else if (input.charAt(currentletter3) == " ") {
                curwidt += 3*letterspace
            }
        }
        return output

    }
    
    //%block="set letter spacing to $input"
    export function SetSpace(input: number) {
       letterspace = input
    }

    //%block="change letter spacing by $input"
    export function ChangeSpace(input: number) {
        letterspace += input
    }
    
    
}
