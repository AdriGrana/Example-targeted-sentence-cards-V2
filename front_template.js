<!--
mpvacious cards, updated with collapsible sections
-->

<div class="wrap">
    <header>
        {{#Tags}}
        <div class="tags">{{Tags}}</div>
        {{/Tags}}
    </header>

    <div class="sent-center">
        <div class="jpsentence Japanese" lang="ja">
            {{edit:morphHighlight:furigana:SentKanji}}
            {{^SentKanji}}
            <nokana>{{edit:kanji:SentFurigana}}</nokana>
            {{/SentKanji}}
        </div>
    </div>
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
    function markPitchForWord(index) {
        let pitchNumberElement = document.getElementById(`pitchnum_hidden${index}`);
        if (!pitchNumberElement) return;

        let pitchNumber = pitchNumberElement.innerHTML.match(/\d+/);
        if (!pitchNumber) {
            paintTargetWord(index, "#A020F0"); // Default color when no valid number found
            return;
        }
        pitchNumber = Number(pitchNumber);

        // Decide color based on pitch number
        if (pitchNumber == 0) {
            paintTargetWord(index, "#3366CC"); // Blue for 平板
        } else if (pitchNumber == 1) {
            paintTargetWord(index, "red"); // Red for 頭高
        } else if (pitchNumber > 1) {
            if (odaka(index, pitchNumber)) {
                paintTargetWord(index, "green"); // Green for 尾高
            } else {
                paintTargetWord(index, "#ff6207"); // Orange for 中高
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

    function splitTagDiv() {
        const header = document.querySelector("header");
        if (!header) return;
        const split = `{{Tags}}`.split(" ");

        header.innerHTML = "";

        for (const tag of split) {
            if (tag.length < 1) continue;
            const tag_elem = document.createElement("div");
            tag_elem.className = "tags";
            tag_elem.innerHTML = tag;
            header.appendChild(tag_elem);
        }
    }

    // Call functions for both words
    markPitchForWord(1);
    markPitchForWord(2);
    splitTagDiv();
</script>
