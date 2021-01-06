<template>
  <div class="form-page">
    <header>
      <h2 class="form-ttl">
        FC IMABARI Sailors'Club 会員登録
      </h2>
    </header>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">
          メールアドレス登録
        </v-stepper-step>

        <v-divider />

        <v-stepper-step :complete="e1 > 2" step="2">
          メールアドレス確認
        </v-stepper-step>

        <v-divider />

        <v-stepper-step :complete="e1 > 3" step="3">
          情報登録
        </v-stepper-step>

        <v-divider />

        <v-stepper-step step="4">
          会員登録完了
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <p class="mt-1 max-w-4xl text-sm leading-5 text-gray-500">
            会員登録をされる際は、以下の規約にご同意いただく必要がございます。ご一読の上、ご同意いただける場合は【同意して送信する】ボタンをクリックしてください。
          </p>

          <v-container
            id="scroll-target"
            style="max-height: 300px; border: 1px solid #000000de;"
            class="overflow-y-auto"
            outlined
          >
            <v-row>
              <dl
                class="mt-2 overflow-y-scroll text-xs box-border h-40 border-2 border-gray-300 bg-gray-100"
              >
                <dt>第 1 条(会員規約の適用範囲)</dt>
                <dd class="px-3 py-2">
                  本規約は、株式会社今治．夢スポーツ(以下「会社」という)が、管理・運営する FC 今治オフィシャルサポーティング組織「FC IMABARI Sailors’ Club」(以下「当組織」という)に入会した会員(以下「会員」という)に適用されるものです。当組織は、FC 今治および FC 今治の 活動地域の活性化を応援することを目的としており、この趣旨に賛同された方々が、本規約の定めるところにより会員資格を得ることに より、当該会員に対し第 3 条に定める会員特典の提供等を行う組織です。
                </dd>

               <dt>第 2 条(運営主体)</dt>
                <dd class="px-3 py-2">
                  当組織は、株式会社今治．夢スポーツが管理・運営しています。
                </dd>

                <dt>第 3 条(会員特典)</dt>
                <dd class="px-3 py-2">
                  当組織は会員に対し、以下の会員特典を入会日をもって付与し、会員は会員資格有効期間が終了するまで同特典を享受できるものとし ます。ただし、会社および当組織は、本規約第 5 条に準じ、本条の会員特典を会員に事前通知することで随時追加・変更・削除できるも のとします。 会員は、会社または当組織が事前許可した場合を除き、会員証の発行権利を除く会員特典を享受する際に、会社または当組織に対し 必ず会員証または会員であることを確認できる情報を提示するものとします。<br />
                  • FC IMABARI Sailors’ Club 会員証<br />
                  • FC 今治の開催するホーム戦入場券の割引購入権利<br />
                  • FC 今治の直営店におけるFC今治公式グッズの10%割引購入権利<br />
                  • FC 今治の開催する限定イベントの参加応募権利<br />
                  • メールマガジン等による情報提供<br />
                  • その他、当組織が定める特典<br />
                </dd>

                <dt>第 4 条(会員規約の適用範囲)</dt>
                <dd class="px-3 py-2">
                  本規約は、会社及び当組織が提供する会員特典およびサービスを利用できる会員に適用され、会員は本規約を遵守するものとします。
                  <br />
                  入会希望者は、本規約に同意の上、入会手続きを行うものとします。
                </dd>

                <dt>第 5 条(会員規約の変更)</dt>
                <dd class="px-3 py-2">
                  会社は、本規約を随時変更・追加・削除等することができるものとします。会社は、本規約を変更・追加・削除等する場合、変更した本規約を変更の1週間前までに会社が管理・運営する公式HP(https://www.fcimabari.com/)への掲載など、その他会社および当組織が適当 と認める方法により会員に通知します。掲載などによる通知から 1 週間後に変更後の本規約は効力を生じるものとし、効力発生後に継 続して会員資格を保有している会員は、変更後の本規約に同意したものとみなし、同規約が適用されるものとします。
                </dd>

                <dt>第 6 条(当組織からの通知と同意)</dt>
                <dd class="px-3 py-2">
                  会社は、管理・運営する公式HPなどへのウェブサイトへの掲載またはメール配信、その他会社が適当と認める方法により、会員に対し随時必要な情報を通知します。
                  <br />
                  前項の通知は、会社が管理・運営するサイトに掲載した時点、または郵送のための投函時点をもって、通知が完了したものとみなします。会員は、会社および当組織からの通知を遅滞なく閲覧・熟読して、確認する義務を負うものとします。
                  <br />
                  会社および当組織からのメール配信は、会員が登録又は変更をしたメールアドレスに配信し、未登録又は誤登録 等による不達、プロバ イダ都合(携帯電話会社を含む)によるメール不達などについて、会社は一切の責任を負いません。
                </dd>

                <dt>第 7 条(年会費・会員資格有効期間)</dt>
                <dd class="px-3 py-2">
                  会員資格の有効期間は毎年 1 月 1 日から 12 月 31 日までの 1 年間とします。ただし、有効期間の途中である当該年の 1 月 2 日以降に入会した場合でも、会員資格の有効期間は入会した年の 12 月 31 日までとなります。
                  <br />
                  会員は、会社所定の方法により入会時又は会員資格の有効期間延長時に、年会費 3000 円(税抜)を会社に支払うものとします。有効 期間が 1 年に満たない場合でも、年会費の減額は行われず、会員は会社に年会費 3000 円(税抜)を支払わなければなりません。
                  <br /><br />
                  会員資格の有効期間を延長する場合、会員は、会社が定める更新期間内に所定の方法により延長申込みおよび年会費の支払を行うものとします。当組織により入金が確認され次第、会員資格の有効期間が翌年の 12 月 31 日まで延長されます。会員が更新期間内に所定の方法にて延長手続きを完了しなかった場合は、会員は、会員資格の有効期間満了日の経過により会員資格を喪失し、当組織から自動退会となります
                  <br />
                  延長手続きを行うことなく有効期間が過ぎた場合、会員資格を再度取得するには、改めて新規入会手続きが必要となり、新しい会員番号が付与されることになります。会員は、会員資格を喪失している期間に当組織の会員に発送された郵便物やメールサービスについて、別途送付が行われないことを予め承諾するものとします
                  <br />
                  会員が有効期間途中で退会を希望する場合には、所定の方法にて退会手続きを行うものとします。
                  <br />
                  ただし退会に伴う支払済みの年会費等の払い戻し等は一切行わないものとします。
                </dd>

                <dt>第 8 条(会員情報の登録と変更)</dt>
                <dd class="px-3 py-2">
                  当組織は、必要な審査・手続き等を経て、入会希望者の入会を承認します。
                  <br />
                  新規入会・変更手続きの際に架空名義や重複・虚偽の登録をしてはなりません。
                  <br />
                  会員は、会員登録した内容に変更があった場合には、速やかに所定の方法で、登録内容の変更を当組織に届け出るものとします。申請 が遅れた場合の郵便物等の不達、特典等のサービスが受けられないといったお問い合わせに、当組織は一切の責任を負いません。
                </dd>

                <dt>第 9 条(入会拒否と会員資格の中断及び停止)</dt>
                <dd class="px-3 py-2">
                  当組織は、入会希望者が次のいずれかに該当すると判断した場合、入会を承認しないことができるものとします。<br />
                  • 登録内容に虚偽の記載・誤記または記入漏れがあった場合<br />
                  • 入会希望者が、既に会員になっている場合<br />
                  • 入会希望者が、過去に会員規約違反等により会員資格を取消されている場合<br />
                  • 同一住所で多数の申し込みがあった場合(家族、同居者は除く)<br />
                  • 入会希望者が実在しない場合、あるいは実在が疑われる場合<br />
                  • その他、当組織が会員とすることを不適当と判断する場合<br />
                  当組織は、入会を承認した後であっても、会員が前項のいずれか、また次項のいずれかに該当することが判明した場合には、事前に通知することなく直ちに会員資格を中断または停止することができるものとします。<br />
                  • 自ら退会を希望する場合<br />
                  • 会費の未納の場合<br />
                  • 当組織を通じて入手した全てのデータ(情報、文章、音、映像、画像、イラスト等)を、著作権法で認められた私的利用の範囲
                  を超えて、複製、販売、出版、放送可能化等の為に利用した場合<br />
                  • 当組織を利用して、自己または第三者の営利を目的とした活動およびその準備を目的とした活動を行った場合<br />
                  • 会員特典により得られたチケット、グッズ、その他会員としての資格に基づき有する権利を、会社の事前許可なくインターネッ
                  トオークション等により第三者に転売、譲渡、貸与、名義変更した場合、または質権の設定、その他の担保に供する場合<br />
                  • 会社および当組織を誹謗中傷する行為や法令違反等、会員資格の資質を問われ除名された場合<br />
                  • 会社および当組織または他の会員、その他第三者の著作権などの権利を侵した場合、また侵すおそれのある場合<br />
                  • 会社および当組織または他の会員、その他第三者の財産やプライバシーなどを侵害する行為や、損害を与えた場合、また侵
                  害するおそれや損害を与えるおそれのある場合<br />
                  • 会社および当組織または他の会員、その他第三者の名誉を傷つけた場合<br />
                  • 犯罪と思われることや犯罪に結びつくことに使用した場合<br />
                  • 選挙運動、宗教や政治活動、性風俗活動などに利用した場合<br />
                  • 会員特典、当組織が提供するサービスを営利目的に使用した場合<br />
                  • 会員番号等の情報を不正に使用した場合<br />
                  • コンピューターウイルスや有害なプログラムを侵入させた場合<br />
                  • 法令または公序良俗に違反する行為、または当組織の運営を妨害する行為を行った場合<br />
                  なお、既に納付された会費は、その理由の如何を問わず、一切返金しないものとします。
                </dd>

                <dt>第 10 条(当組織の内容等の変更)</dt>
                <dd class="px-3 py-2">
                  会社は、会員への事前の通知・承諾なくして、当組織の諸条件・運用規則、または内容・名称を変更することができ、会員はこれを承諾するものとします。
                  <br />
                  変更については、会社が所定の方法により会員に通知するものとします。
                </dd>

                <dt>第 11 条(設備等)</dt>
                <dd class="px-3 py-2">
                  会員は、当組織が提供するサービス(以下「当組織サービス」という)を利用するために必要な通信機器・ソフトウェア、その他必要となる 全ての機器・通信回線等について、自己の費用と責任において準備し、利用するものとします。
                </dd>

                <dt>第 12 条(自己責任の原則)</dt>
                <dd class="px-3 py-2">
                  会員は、当組織サービスの利用により自己に損害が発生した場合、あるいは、会員が本規約上の義務を履行しないことにより自己に損 害が発生した場合、自己の責任と費用をもってすみやかに処理解決するものとします。
                  <br />
                  会員は、当組織サービスの利用により当組織または他者に対して損害を与えた場合、あるいは会員が本規約上の義務を履行しないこと により当組織または他者に対して損害を与えた場合、自己の責任と費用をもって損害をすみやかに賠償するものとします。
                  <br />
                  会社及び当組織は、当組織サービスの利用により発生した会員および第三者の損害一切について、当組織の責めに帰すべき事由があ る場合を除いて、一切の責任および損害賠償義務を負わないものとします。
                </dd>

                <dt>第 13 条(会員証および会員番号等の管理責任)</dt>
                <dd class="px-3 py-2">
                  会員は、当組織が会員に付与する会員証および会員番号等の会員情報の管理責任を負うものとします。
                  <br />
                  会員は、会員証および会員番号等の情報を他者に利用させたり、他者と共有、あるいは貸与、譲渡、名義変更、売買、質入れ等をしたりしてはならないものとします。
                  <br />
                  会員は、当組織の会員証を破損や紛失した場合、当組織に再発行を申し込むことができるものする。ただし、会員は再発行を申し込むにあたり会社及び当組織が指定する所定の再発行手続きを行い、再発行手数料を支払うものとする
                  <br />
                  当組織は、会員の会員番号等の情報が他者に使用されたことによって当該会員が被る損害については、当該会員の故意過失の有無にかかわらず一切の責任を負わないものとします。
                  <br />
                  会員は、会員番号等の情報が盗まれた場合や、第三者に使用されていることを知った場合には、直ちに当組織に連絡するものとし、当組織からの指示がある場合にはこれに従うものとします。
                </dd>

                <dt>第 14 条(禁止事項)</dt>
                <dd class="px-3 py-2">
                  会員は当組織において以下の行為を行わないものとします。<br />
                  • 他者(当組織を含む。以下同)の著作権・商標権等の知的財産権を侵害する行為、またはそのおそれのある行為<br />
                  • 他者の財産・プライバシーもしくは肖像権を侵害する行為、またはそのおそれのある行為<br />
                  • 他者を差別もしくは誹謗中傷し、または他者の名誉もしくは信用を毀損する行為<br />
                  • 当組織に対して運営を妨害し、または不利益や損害を与える行為<br />
                  • 当組織を利用した営業活動・営利目的の行為、またはその準備を目的とした行為<br />
                  • 詐欺等の犯罪および犯罪に結びつく行為、またはそのおそれのある行為<br />
                  • 無限連鎖講(ネズミ講またはこれに類似するもの)を開設する、またはこれらへの参加を勧誘する行為<br />
                  <br />
                  • 公序良俗に反する行為、またはそのおそれのある行為<br />
                  • 会員番号等の情報を不正に使用する行為<br />
                  • 他者になりすまして当組織を利用する行為<br />
                  • 当組織または他者のデータ等を改ざん・消去等する行為<br />
                  • 有害なコンピュータプログラム等を使用、または提供する行為<br />
                  • その他、法令・本規約に違反する行為またはそのおそれのある行為<br />
                  • その他、当組織が不適切と判断する行為<br />
                  前項に該当する会員の行為によって当組織および第三者に損害が生じた場合、会員資格を喪失した後であっても、当該会員は善意をも って迅速に対応を行うものとする。
                </dd>

                <dt>第 15 条(会員個人情報の取り扱い)</dt>
                <dd class="px-3 py-2">
                  当組織は、当組織が保有する会員の個人情報(以下『個人情報』という)に関して適用される法規を遵守し、適切に取り扱うものとします。
                  <br />
                  当組織における会員の個人情報の取扱いについては、会社が別途定める「個人情報の取扱いについて」に従うものとします。
                </dd>

                <dt>第 16 条(会員の利用記録の取り扱い)</dt>
                <dd class="px-3 py-2">
                  会社は当組織の運営のために管理・運営するサイトにおける会員の利用記録およびアクセスログの集計、分析を行い、統計資料を作成し、新規サービスの開発等の業務を遂行するために利用、処理することができるものとします。
                  <br />
                  また会社は、業務上の必要に応じて統計資料を業務委託先等に提供することができるものとします。
                </dd>

                <dt>第 17 条(当組織の活動停止・解散)</dt>
                <dd class="px-3 py-2">
                  会社は、会社の事情、当組織の運営状況その他の事情により、当組織の運営を継続しがたいと判断した場合、当組織を解散することができるものとします。この場合、会社が必要と認めた場合を除き、会社は年会費当の返還等の措置を行わないものとします。また、会社は、以下のいずれかの事由が生じた場合、会員に事前に通知することなく、当組織の運営を一時的に中断、もしくは中止することができるものとします。<br />
                  • システムの保守を定期的、または緊急に行う場合<br />
                  • 火災・地震・噴火・洪水・津波・停電等の非常事態により、当組織運営ができなくなった場合<br />
                  • 戦争・暴動・騒乱・労働争議等により、当組織運営ができなくなった場合<br />
                  • その他、当組織が一時的な中断、または中止が必要と判断した場合<br />
                  当組織運営の一時的な中断もしくは中止により、会員または第三者が被った損害について、会社および当組織は一切の責任を負わないものとします。
                </dd>

                <dt>第 18 条(免責事項)</dt>
                <dd class="px-3 py-2">
                  当組織のサービス内容は、その時点で会社が提供可能なものとします。当組織は、会員に提供するデータ等について、その完全性・正確性・有用性等について、いかなる責任も負わないものとします。
                  <br />
                  当組織は、会員が登録したデータ等の流出・消失・他者による改ざん等について、別途定めがある場合を除いて、いかなる責任も負わないものとします。
                  <br />
                  前述の他、当組織サービスの利用により発生した会員の損害、および当組織サービス提供の遅滞・変更・中断・中止・停止・廃止等の結果、会員または第三者が被った損害等について、当組織の責めに帰すべき事由がある場合を除いて、一切の責任および損害賠償義務を負わないものとします。
                </dd>

                <dt>第 19 条(所有権)</dt>
                <dd class="px-3 py-2">
                  当組織を構成するすべてのサービス・プログラム・ソフトウェア・手続き・商標・商号等は、会社および当組織に帰属するものとします。
                  <br />
                  会員は、会社および当組織に提供した文章・情報等について知的所有権を保有せず、何らの請求権も保有しないものとします。
                  <br />
                  会員は、会社および当組織に提供する文章・情報等の内容に虚偽がない事を事前に確認したうえ会社に情報を提供するものとします。
                </dd>

                <dt>第 20 条(管轄裁判所)</dt>
                <dd class="px-3 py-2">
                  会員と当組織との間で紛争が生じた場合、当該当事者がともに誠意をもって協議するものとします。
                  <br />
                  協議しても解決せず訴訟の必要が生じた場合、松山地方裁判所今治支部または今治簡易裁判所を第一審の専属管轄裁判所とします。
                </dd>

                <dt>第 21 条(準拠法)</dt>
                <dd class="px-3 py-2">
                  本規約の成立・効力・履行および解釈に関しては、日本法が適用されるものとします。
                </dd>
              </dl>
            </v-row>
          </v-container>
          <div class="row-none">
            <v-container>
              <v-row>
                <v-form
                  ref="form1"
                  v-model="valid"
                  lazy-validation
                  @submit.prevent="send_email"
                >
                  <p>
                    ご登録いただくメールアドレスを入力して「同意して送信する」をクリックして送信してください。
                  </p>
                  <p>
                    <v-text-field
                      v-model="email"
                      label="メールアドレス"
                      type="email"
                      :rules="[rules.required]"
                      outlined
                    />
                  </p>
                  <v-btn
                    type="submit"
                    block
                    x-large
                    color="success"
                    dark
                    :loading="loading1"
                  >
                    同意して送信する
                  </v-btn>
                </v-form>
              </v-row>
            </v-container>
          </div>
        </v-stepper-content>

        <v-stepper-content step="2">
          <p class="mt-1 max-w-4xl text-sm leading-5 text-gray-500">
            メールボックスに届いたメールに記載されているリンクからアクセスをしてください。
          </p>
          <v-container />
        </v-stepper-content>

        <v-stepper-content step="3">
          <header>
            <h2>
              FC IMABARI Sailors' Club会員 情報登録
            </h2>
          </header>
          <p>
          </p>
          <v-form
            ref="form2"
            v-model="valid"
            lazy-validation
            @submit.prevent="regist"
          >
            <v-container fluid>
              <v-row>
                <v-col cols="4">
                  <v-subheader>
                    <span style="color: red;">*</span>お名前
                  </v-subheader>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="name1"
                    label="姓"
                    :rules="[rules.required]"
                    outlined
                  />
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="name2"
                    label="名"
                    :rules="[rules.required]"
                    outlined
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4">
                  <v-subheader>
                    <span style="color: red;">*</span>お名前(フリガナ)
                  </v-subheader>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="namekana1"
                    label="セイ"
                    :rules="[rules.required]"
                    outlined
                  />
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="namekana2"
                    label="メイ"
                    :rules="[rules.required]"
                    outlined
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4">
                  <v-subheader>
                    <span style="color: red;">*</span>性別
                  </v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-radio-group v-model="sex" row :rules="[rules.required]">
                    <v-radio label="男性" value="m" />
                    <v-radio label="女性" value="f" />
                  </v-radio-group>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4">
                  <v-subheader>
                    <span style="color: red;">*</span>生年月日
                  </v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="birth"
                        label="生年月日"
                        prepend-icon="mdi-calendar"
                        readonly
                        :rules="[rules.required]"
                        v-bind="attrs"
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      ref="picker"
                      v-model="birth"
                      :max="new Date().toISOString().substr(0, 10)"
                      min="1900-01-01"
                      locale="jp-ja"
                      @change="save"
                    />
                  </v-menu>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4">
                  <v-subheader>
                    <span style="color: red;">*</span>郵便番号
                  </v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    v-model="zip_code"
                    label="郵便番号"
                    type="number"
                    :rules="[rules.required, rules.zip_length]"
                    hint="ハイフンなしの半角数字7桁をご入力ください"
                    counter
                    outlined
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4">
                  <v-subheader>
                    <span style="color: red;">*</span>都道府県
                  </v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-select
                    v-model="tdfk_cd"
                    :items="arrTdfk_cd"
                    :rules="[rules.required]"
                    item-text="name"
                    item-value="code"
                    menu-props="auto"
                    label="都道府県を選択してください"
                    hide-details
                    single-line
                    outlined
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>
                    <span style="color: red;">*</span>市区町村
                  </v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    v-model="address1"
                    label="市区町村"
                    :rules="[rules.required]"
                    outlined
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>
                    <span style="color: red;">*</span>番地
                  </v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    v-model="address2"
                    label="番地"
                    :rules="[rules.required]"
                    outlined
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>建物名／部屋番号</v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    v-model="address3"
                    label="建物名／部屋番号"
                    outlined
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>
                    <span style="color: red;">*</span>電話番号
                  </v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    v-model="tel"
                    label="電話番号"
                    type="tel"
                    :rules="[rules.required, rules.tel]"
                    hint="ハイフンなしの半角数字をご入力ください"
                    counter
                    outlined
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>携帯電話番号</v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    v-model="m_tel"
                    label="携帯電話番号"
                    type="tel"
                    :rules="[rules.tel]"
                    hint="ハイフンなしの半角数字をご入力ください"
                    counter
                    outlined
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>
                    第１メールアドレス(ログイン時のIDになります)
                  </v-subheader>
                </v-col>
                <v-col cols="8">
                  <p v-html="email" />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>第２メールアドレス</v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    v-model="subemail"
                    label="第２メールアドレス"
                    type="email"
                    outlined
                    autocomplete="off"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>
                    <span style="color: red;">*</span>パスワード
                  </v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    v-model="login_pwd"
                    :append-icon="password_show ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[
                      rules.required,
                      rules.password_min,
                      rules.password,
                    ]"
                    :type="password_show ? 'text' : 'password'"
                    label="パスワード"
                    hint="8文字以上の半角英数字混在でご入力ください。記号を利用する場合は -_&=+%#@$*.!: が利用可能です。"
                    persistent-hint
                    counter
                    @click:append="password_show = !password_show"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>
                    <span style="color: red;">*</span>メールマガジン配信
                  </v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-checkbox
                    v-model="mailmaga_flg"
                    class="mx-2"
                    label="希望する"
                  />
                </v-col>
              </v-row>
              <!-- アンケート -->
              <v-row>
                <v-col cols="4">
                  <v-subheader>
                    <span style="color: red;">*</span>Q1.ご職業を教えてください
                  </v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-radio-group v-model="question_1" row :rules="[rules.required]">
                    <v-radio label="高校生以下" value="1" />
                    <v-radio label="大学生" value="2" />
                    <v-radio label="会社員" value="3" />
                    <v-radio label="公務員" value="4" />
                    <v-radio label="自営業" value="5" />
                    <v-radio label="主婦" value="6" />
                    <v-radio label="その他" value="7" />
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>
                    <span style="color: red;">*</span>Q2.FC今治を応援し始めたおおよその時期を教えてください
                  </v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-radio-group v-model="question_2" row :rules="[rules.required]">
                    <v-radio label="2014年以前" value="1" />
                    <v-radio label="2015年から" value="2" />
                    <v-radio label="2016年から" value="3" />
                    <v-radio label="2017年から" value="4" />
                    <v-radio label="2018年から" value="5" />
                    <v-radio label="2019年から" value="6" />
                    <v-radio label="2020年から" value="7" />
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>
                    <span style="color: red;">*</span>Q3.FC今治のユニフォーム（発売時期問わず）を持っていますか？
                  </v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-radio-group v-model="question_3" row :rules="[rules.required]">
                    <v-radio label="はい" value="1" />
                    <v-radio label="いいえ" value="2" />
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>
                    <span style="color: red;">*</span>Q4.2000シーズン、何回程度FC今治のアウェイ戦を観戦しましたか？
                  </v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-radio-group v-model="question_4" row :rules="[rules.required]">
                    <v-radio label="1試合以下" value="1" />
                    <v-radio label="2〜4試合" value="2" />
                    <v-radio label="5〜10試合" value="3" />
                    <v-radio label="11試合以上" value="4" />
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>
                    <span style="color: red;">*</span>Q5.2000シーズン、何回程度ありがとうサービス．夢スタジアム(R)でホームゲームを観戦しましたか？
                  </v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-radio-group v-model="question_5" row :rules="[rules.required]">
                    <v-radio label="1試合以下" value="1" />
                    <v-radio label="2～4試合" value="2" />
                    <v-radio label="5～10試合" value="3" />
                    <v-radio label="11試合以上" value="4" />
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>
                    <span style="color: red;">*</span>Q6.試合には誰と一緒に応援に行くことが多いですか？
                  </v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-radio-group v-model="question_6" row :rules="[rules.required]">
                    <v-radio label="1人" value="1" />
                    <v-radio label="家族" value="2" />
                    <v-radio label="会社・学校等の友人" value="3" />
                    <v-radio label="試合を通じて出会った友人" value="4" />
                    <v-radio label="趣味仲間" value="5" />
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>
                    <span style="color: red;">*</span>Q7.普段主にどのような手段でFC今治の情報を収集しますか？（３つまで選択）
                  </v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-row>
                    <v-col cols="4">
                      <v-checkbox
                        v-model="question_7"
                        value="1"
                        label="TV 新聞"
                        :disabled="is_question_7_limit(1)"
                        hide-details
                      />
                    </v-col>
                    <v-col cols="4">
                      <v-checkbox
                        v-model="question_7"
                        value="2"
                        label="ラジオ"
                        :disabled="is_question_7_limit(2)"
                        hide-details
                      />
                    </v-col>
                    <v-col cols="4">
                      <v-checkbox
                        v-model="question_7"
                        value="3"
                        label="公式HP"
                        :disabled="is_question_7_limit(3)"
                        hide-details
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="4">
                      <v-checkbox
                        v-model="question_7"
                        value="4"
                        label="公式SNS"
                        :disabled="is_question_7_limit(4)"
                        hide-details
                      />
                    </v-col>
                    <v-col cols="4">
                      <v-checkbox
                        v-model="question_7"
                        value="5"
                        label="口コミ"
                        :disabled="is_question_7_limit(5)"
                        hide-details
                      />
                    </v-col>
                    <v-col cols="4">
                      <v-checkbox
                        v-model="question_7"
                        value="6"
                        label="チラシ・ポスター"
                        :disabled="is_question_7_limit(6)"
                        hide-details
                      />
                    </v-col>
                    <v-col cols="4">
                      <v-checkbox
                        v-model="question_7"
                        value="7"
                        label="その他"
                        :disabled="is_question_7_limit(7)"
                        hide-details
                      />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>
                    <span style="color: red;">*</span>Q8.今後セーラーズクラブの特典として期待するものを教えてください（３つまで選択）
                  </v-subheader>
                </v-col>
                <v-col cols="8">
                      <v-checkbox
                        v-model="question_8"
                        value="1"
                        label="キッズ向けの特典"
                        :disabled="is_question_8_limit(1)"
                        hide-details
                      />
                      <v-checkbox
                        v-model="question_8"
                        value="2"
                        label="ありがとうサービス．夢スタジアム(R)の内覧ツアー"
                        :disabled="is_question_8_limit(2)"
                        hide-details
                      />
                      <v-checkbox
                        v-model="question_8"
                        value="3"
                        label="選手とのふれあいイベント"
                        :disabled="is_question_8_limit(3)"
                        hide-details
                      />
                      <v-checkbox
                        v-model="question_8"
                        value="4"
                        label="会員限定グッズ販売"
                        :disabled="is_question_8_limit(4)"
                        hide-details
                      />
                      <v-checkbox
                        v-model="question_8"
                        value="5"
                        label="限定ウェブサイトの開設"
                        :disabled="is_question_8_limit(5)"
                        hide-details
                      />
                      <v-checkbox
                        v-model="question_8"
                        value="6"
                        label="アウェイ観戦ツアーの割引"
                        :disabled="is_question_8_limit(6)"
                        hide-details
                      />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>Q9.その他応援メッセージやご意見があればぜひ教えてください</v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    v-model="question_9"
                    label=""
                    type="text"
                    counter
                    outlined
                  />
                </v-col>
              </v-row>
              <!-- /アンケート -->
              <v-row>
                <v-col cols="12">
                  <v-btn
                    type="submit"
                    block
                    x-large
                    color="success"
                    dark
                    :loading="loading2"
                  >
                    登録する
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-stepper-content>
        <v-stepper-content step="4">
          <header>
            <h2>
              FC IMABARI Sailors'Club　会員登録完了
            </h2>
            <p class="mt-1 max-w-4xl text-sm leading-5 text-gray-500">
              FC IMABARI Sailors'Club 無料会員登録を完了しました。
            </p>
          </header>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import axios from "axios"

export default {
  auth: false,
  data() {
    return {
      valid: true,
      e1: 1,
      password_show: false,
      login_pwd: "",
      email: "",
      fax: "",
      tel: "",
      m_tel: "",
      subemail: "",
      name1: "",
      name2: "",
      namekana1: "",
      namekana2: "",
      zip_code: "",
      tdfk_cd: "",
      address1: "",
      address2: "",
      address3: "",
      birth: "",
      sex: "",
      mailmaga_flg: false,
      menu: false,
      arrTdfk_cd: [
        { code: "01", name: "北海道" },
        { code: "02", name: "青森県" },
        { code: "03", name: "岩手県" },
        { code: "04", name: "宮城県" },
        { code: "05", name: "秋田県" },
        { code: "06", name: "山形県" },
        { code: "07", name: "福島県" },
        { code: "08", name: "茨城県" },
        { code: "09", name: "栃木県" },
        { code: "10", name: "群馬県" },
        { code: "11", name: "埼玉県" },
        { code: "12", name: "千葉県" },
        { code: "13", name: "東京都" },
        { code: "14", name: "神奈川県" },
        { code: "15", name: "新潟県" },
        { code: "16", name: "富山県" },
        { code: "17", name: "石川県" },
        { code: "18", name: "福井県" },
        { code: "19", name: "山梨県" },
        { code: "20", name: "長野県" },
        { code: "21", name: "岐阜県" },
        { code: "22", name: "静岡県" },
        { code: "23", name: "愛知県" },
        { code: "24", name: "三重県" },
        { code: "25", name: "滋賀県" },
        { code: "26", name: "京都府" },
        { code: "27", name: "大阪府" },
        { code: "28", name: "兵庫県" },
        { code: "29", name: "奈良県" },
        { code: "30", name: "和歌山県" },
        { code: "31", name: "鳥取県" },
        { code: "32", name: "島根県" },
        { code: "33", name: "岡山県" },
        { code: "34", name: "広島県" },
        { code: "35", name: "山口県" },
        { code: "36", name: "徳島県" },
        { code: "37", name: "香川県" },
        { code: "38", name: "愛媛県" },
        { code: "39", name: "高知県" },
        { code: "40", name: "福岡県" },
        { code: "41", name: "佐賀県" },
        { code: "42", name: "長崎県" },
        { code: "43", name: "熊本県" },
        { code: "44", name: "大分県" },
        { code: "45", name: "宮崎県" },
        { code: "46", name: "鹿児島県" },
        { code: "47", name: "沖縄県" },
      ],
      ec_payment_id: "58",
      product_id: "41204",
      product_id2: "",
      cardName: "",
      cardNumber: "",
      cardMonth: "",
      cardYear: "",
      cardCvv: "",
      loading1: false,
      loading2: false,
      loading3: false,
      // アンケート
      question_1: 0, // 職業
      question_2: 0, // 応援し始めた時期
      question_3: 0, // ユニフォーム所持
      question_4: 0, // アウェイ戦
      question_5: 0, // ホームゲーム観戦
      question_6: 0, // 一緒に応援に行く人
      question_7: [], // 今治の情報
      question_8: [], // 一緒に応援に行く人
      question_9: "",
      rules: {
        required: (value) => !!value || "この項目は必須入力です",
        password_min: (v) => v.length >= 8 || "最低8文字以上を入力してください",
        password: (v) =>
          v.length == 0 ||
          /^[a-zA-Z0-9\-_&=+%#@$*.!:]+$/.test(v) ||
          "半角英数字と記号(-_&=+%#@$*.!:)でご入力ください",
        zip_length: (v) => v.length == 7 || "7文字の半角数字で入力してください",
        tel: (v) =>
          v.length == 0 ||
          /^0[0-9]{9,10}$/.test(v) ||
          "ハイフンなしの半角数字をご入力ください",
      },
    }
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"))
    },
    zip: function (val) {
      if (7 != val.length) {
        this.tdfk_cd = ""
        this.address1 = ""
        this.address2 = ""
      }

      let self = this
      let url = "https://api.zipaddress.net/?zipcode=" + val
      axios.get(url).then(function (response) {
        if (response.data.code == "200") {
          self.tdfk_cd = response.data.data.pref
          self.address1 = response.data.data.address
          self.address2 = response.data.data.town
        } else {
          self.tdfk_cd = ""
          self.address1 = ""
          self.address2 = ""
        }
      })
    },
  },
  created() {
    if (this.$route.query.key) {
      this.email_hash = this.$route.query.key
      let self = this
      self.$auth.ctx.$axios
        .post("/rcms-api/1/member/invite", {
          email_hash: this.email_hash,
        })
        .then(function (response) {
          self.email = response.data.data.email
          self.$store.dispatch(
            "snackbar/setMessage",
            "メールアドレスを確認しました"
          )
          self.$store.dispatch("snackbar/snackOn")
          self.e1 = 3
        })
        .catch(function (error) {
          console.log(error)
          self.e1 = 2
        })
    }
  },
  methods: {
    // アンケート7問の選択制限
    is_question_7_limit(num) {
      if(this.question_7.find(value => value == num)) {
        return false
      }
      return this.question_7.length > 2 && this.question_7.indexOf(num) === -1
    },
    // アンケート8問の選択制限
    is_question_8_limit(num) {
      if(this.question_8.find(value => value == num)) {
        return false
      }
      return this.question_8.length > 2 && this.question_8.indexOf(num) === -1
    },
    send_email() {
      this.loading1 = true
      if (this.$refs.form1.validate()) {
        let self = this

        this.$auth.ctx.$axios
          .post("/rcms-api/1/member/invite", {
            email: self.email,
          })
          .then(function (response) {
            if (response.data.errors.length === 0) {
              self.$store.dispatch("snackbar/setMessage", "メール送信しました")
              self.$store.dispatch("snackbar/snackOn")
              self.e1 = 2
            }
            self.loading1 = false
          })
          .catch(function (error) {
            self.$store.dispatch(
              "snackbar/setError",
              error.response.data.errors?.[0]
            )
            self.$store.dispatch("snackbar/snackOn")
            self.loading1 = false
          })
      } else {
        this.loading1 = false
      }
    },
    regist() {
      this.loading2 = true
      if (this.$refs.form2.validate()) {
        let self = this
        this.$auth.ctx.$axios
          .post("/rcms-api/1/member/regist", {
            name1: this.name1,
            name2: this.name2,
            namekana1: this.namekana1,
            namekana2: this.namekana2,
            sex: this.sex,
            birth: this.birth,
            zip_code: this.zip_code,
            tdfk_cd: this.tdfk_cd,
            address1: this.address1,
            address2: this.address2,
            address3: this.address3,
            tel: this.tel,
            m_tel: this.m_tel,
            email: this.email,
            email2: this.subemail,
            email_send_ng_flg: this.mailmaga_flg ? 0 : 1,
            login_pwd: this.login_pwd,
            q1: this.question_1,
            q2: this.question_2,
            q3: this.question_3,
            q4: this.question_4,
            q5: this.question_5,
            q6: this.question_6,
            q7: this.question_7,
            q8: ["1"],
            q9: this.question_9,
          })
          .then(function (response) {
            if (response.data.errors.length === 0) {
              self.$store.dispatch("snackbar/setMessage", "会員登録しました")
              self.$store.dispatch("snackbar/snackOn")
              self.e1 = 4
            }
            self.loading2 = false
          })
          .catch(function (error) {
            self.$store.dispatch(
              "snackbar/setError",
              error.response.data.errors?.[0]
            )
            self.$store.dispatch("snackbar/snackOn")
            self.loading2 = false
          })
      } else {
        this.loading2 = false
      }
    },
    purchase() {
      this.loading3 = true
      if (this.$refs.form4.validate()) {
        let self = this

        if (this.ec_payment_id != 58) {
          if (self.product_id == "41201") {
            self.product_id2 = "41209"
          } else if (self.product_id == "41202") {
            self.product_id2 = "41208"
          } else if (self.product_id == "41203") {
            self.product_id2 = "41210"
          } else if (self.product_id == "41204") {
            self.product_id2 = "41207"
          }
        }

        if (this.ec_payment_id == 58) {
          let paygentToken = new PaygentToken()
          paygentToken.createToken(
            process.env.PAYGENT_MERCHANT_ID,
            process.env.PAYGENT_TOKEN,
            {
              card_number: self.cardNumber,
              expire_year: self.cardYear,
              expire_month: self.cardMonth,
              cvc: self.cardCvv,
              name: self.cardName,
            },
            function (response) {
              if (response.result == "0000") {
                self.$auth.ctx.$axios
                  .post(
                    "/rcms-api/1/ec/purchase",
                    {
                      ec_payment_id: parseInt(self.ec_payment_id),
                      product_id: parseInt(self.product_id),
                      quantity: 1,
                      card_token: response.tokenizedCardObject.token,
                    },
                    { withCredentials: true }
                  )
                  .then(function (response) {
                    self.$store.dispatch(
                      "snackbar/setMessage",
                      "会員登録のお申し込みが完了しました"
                    )
                    self.$store.dispatch("snackbar/snackOn")
                    self.$router.push("/")
                    self.loading3 = false
                  })
                  .catch(function (error) {
                    self.$store.dispatch(
                      "snackbar/setError",
                      error.response.data.errors?.[0]
                    )
                    self.$store.dispatch("snackbar/snackOn")
                    self.loading3 = false
                  })
              } else {
                self.$store.dispatch(
                  "snackbar/setError",
                  "カード入力内容に不備があります。再度、入力内容をご確認ください[code:" +
                    response.result +
                    "]"
                )
                self.$store.dispatch("snackbar/snackOn")
                self.loading3 = false
              }
            }
          )
        } else {
          self.$auth.ctx.$axios
            .post(
              "/rcms-api/1/ec/purchase",
              {
                ec_payment_id: parseInt(self.ec_payment_id),
                product_id: parseInt(self.product_id2),
                quantity: 1,
              },
              { withCredentials: true }
            )
            .then(function (response) {
              self.$store.dispatch(
                "snackbar/setMessage",
                "会員登録のお申し込みが完了しました。メールをご確認の上、決済手続きをお願いいたします。"
              )
              self.$store.dispatch("snackbar/snackOn")
              self.$router.push("/")
              self.loading3 = false
            })
            .catch(function (error) {
              self.$store.dispatch(
                "snackbar/setError",
                error.response.data.errors?.[0]
              )
              self.$store.dispatch("snackbar/snackOn")
              self.loading3 = false
            })
        }
      } else {
        this.loading3 = false
      }
    },
    save(birth) {
      this.$refs.menu.save(birth)
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
