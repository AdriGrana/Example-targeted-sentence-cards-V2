<div class="wrap">
    <div class="fside">{{FrontSide}}</div>

    <div class="sent-center">
        <div class="jpsentence Japanese" lang="ja">
            {{edit:furigana:SentFurigana}}
            {{^SentFurigana}}{{edit:furigana:SentKanji}}{{/SentFurigana}}
        </div>
        {{#SentEng}}
        <div class="ensentence" lang="en">{{hint:SentEng}}</div>
        {{/SentEng}}
    </div>

    <!-- Collapsible section for the first vocabulary word -->
    {{#VocabDef}}
    <details open class="vocab">
        <summary>Vocabulary 1</summary>
        <div>
            {{VocabAudio}}{{SentAudio}}{{VocabPitchPattern}}
            {{^VocabPitchPattern}}{{text:kana:VocabFurigana}}{{/VocabPitchPattern}}
            {{#VocabPitchNum}}<span class="tags" id="pitchnum1">{{VocabPitchNum}}</span>{{/VocabPitchNum}}
            {{#VocabKanji}}【{{text:kanji:VocabKanji}}】{{/VocabKanji}}
        </div>
        <div class="definitions">{{edit:furigana:VocabDef}}</div>
    </details>
    {{/VocabDef}}

    <!-- Collapsible section for the second vocabulary word -->
    {{#VocabDef2}}
    <details open class="vocab">
        <summary>Vocabulary 2</summary>
        <div>
            {{VocabAudio2}}{{VocabPitchPattern2}}
            {{^VocabPitchPattern2}}{{text:kana:VocabFurigana2}}{{/VocabPitchPattern2}}
            {{#VocabPitchNum2}}<span class="tags" id="pitchnum2">{{VocabPitchNum2}}</span>{{/VocabPitchNum2}}
            {{#VocabKanji2}}【{{text:kanji:VocabKanji2}}】{{/VocabKanji2}}
        </div>
        <div class="definitions">{{edit:furigana:VocabDef2}}</div>
    </details>
    {{/VocabDef2}}

    <!-- Collapsible section for Notes -->
    {{#Notes}}
    <details open class="notes">
        <summary>Notes</summary>
        <div>{{furigana:Notes}}</div>
    </details>
    {{/Notes}}

    <!-- Collapsible section for Image -->
    {{#Image}}
    <details class="images-details">
        <summary>Image</summary>
        <div class="images">{{Image}}</div>
    </details>
    {{/Image}}

    <hr />

    <footer>
        {{#SentKanji}}
        <a title="Translate with SimplyTranslate"
           href="https://translate.metalune.xyz/?engine=google&text={{text:kanji:SentKanji}}&sl=ja&tl=en">Translate</a>
        <a href="https://jisho.org/search?keyword={{text:kanji:SentKanji}}" title="Sentence on Jisho">Jisho</a>
        <a href="https://www.google.co.jp/search?q={{text:kanji:SentKanji}}&tbm=isch" title="Search images">Images</a>
        {{/SentKanji}}

        <!-- Links for the first vocab word -->
        {{#VocabKanji}}
        <a href="http://www.weblio.jp/content/{{text:VocabKanji}}" title="Vocab on Weblio">Weblio</a>
        <a href="https://wadoku.de/search/?q={{text:VocabKanji}}" title="Vocab on Wadoku">Wadoku</a>
        {{/VocabKanji}}

        <!-- Links for the second vocab word -->
        {{#VocabKanji2}}
        <a href="http://www.weblio.jp/content/{{text:VocabKanji2}}" title="Vocab on Weblio">Weblio</a>
        <a href="https://wadoku.de/search/?q={{text:VocabKanji2}}" title="Vocab on Wadoku">Wadoku</a>
        {{/VocabKanji2}}
    </footer>
</div> <!-- /wrap -->

<div style="display:none;">
    <!-- Hidden fields for the first vocabulary word -->
    <div id="pitchnum_hidden1">{{VocabPitchNum}}</div>
    <div id="kanaword_hidden1">{{kana:VocabFurigana}}</div>
    <!-- Hidden fields for the second vocabulary word -->
    <div id="pitchnum_hidden2">{{VocabPitchNum2}}</div>
    <div id="kanaword_hidden2">{{kana:VocabFurigana2}}</div>
</div>

<script>
    function tweakRevealText() {
        const elem = document.querySelector("div.ensentence > a.hint");
        if (elem) {
            elem.innerText = "Reveal English translation";
        }
    }

    function removePitchBrackets() {
        for (let i = 1; i <= 2; i++) {
            const tags = document.getElementById(`pitchnum${i}`);
            if (tags) {
                tags.innerHTML = tags.innerHTML.replace(/[\[\]]/g, "");
            }
        }
    }

    function markPitchForWord(index) {
        let pitchNumberElement = document.getElementById(`pitchnum_hidden${index}`);
        if (!pitchNumberElement) return;

        let pitchNumber = pitchNumberElement.innerHTML.match(/\d+/);
        if (!pitchNumber) {
            paintTargetWord(index, "#A020F0");
            return;
        }
        pitchNumber = Number(pitchNumber);

        if (pitchNumber == 0) {
            paintTargetWord(index, "#3366CC");
        } else if (pitchNumber == 1) {
            paintTargetWord(index, "red");
        } else if (pitchNumber > 1) {
            if (odaka(index, pitchNumber)) {
                paintTargetWord(index, "green");
            } else {
                paintTargetWord(index, "#ff6207");
            }
        }
    }

    function paintTargetWord(index, color) {
        const wordElements = document.querySelectorAll(".jpsentence b, .jpsentence strong");
        if (wordElements.length >= index) {
            wordElements[index - 1].style.color = color;
        }
    }

    function odaka(index, pitch_num) {
        const vocab_kana_elem = document.getElementById(`kanaword_hidden${index}`);
        if (!vocab_kana_elem) return false;

        const n_moras = vocab_kana_elem.innerHTML.replace(/[ャュョゃゅょ]/g, "").length;
        return n_moras == pitch_num;
    }

    function reformatMultiFurigana() {
        const separators = /[\s;,.、・。]+/iu;
        const max_inline = 2;
        document.querySelectorAll("ruby:not(ruby ruby)").forEach(ruby => {
            try {
                const kanji = (ruby.querySelector("rb") || ruby.firstChild).textContent.trim();
                const readings = ruby.querySelector("rt").textContent
                    .split(separators)
                    .map(str => str.trim())
                    .filter(str => str.length);

                if (readings.length > 1) {
                    ruby.innerHTML = formatNewRuby(kanji, readings.slice(0, max_inline));
                }
                if (readings.length > max_inline) {
                    const sequence = readings.map(reading => `<span class="tooltip-reading">${reading}</span>`).join('');
                    const wrapper = document.createElement("span");
                    wrapper.classList.add("tooltip");
                    wrapper.innerHTML += `<span class="tooltip-text">${sequence}</span>`;
                    ruby.replaceWith(wrapper);
                    wrapper.appendChild(ruby);
                }
            } catch (error) {
                console.error(error);
            }
        })
    }

    function formatNewRuby(kanji, readings) {
        if (readings.length > 1) {
            return `<ruby>${formatNewRuby(kanji, readings.slice(0, -1))}</ruby><rt>${readings.slice(-1)}</rt>`
        } else {
            return `<rb>${kanji}</rb><rt>${readings.join('')}</rt>`
        }
    }

    function toggleImageDetails() {
        for (const detailsElement of document.querySelectorAll(".images-details")) {
            detailsElement.toggleAttribute("open", true);
        }
    }

    // Call functions for both words
    markPitchForWord(1);
    markPitchForWord(2);
    removePitchBrackets();
    tweakRevealText();
    reformatMultiFurigana();
    toggleImageDetails();
</script>
