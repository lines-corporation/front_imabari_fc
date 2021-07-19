<template>
  <div class="container">
    <div class="article-page ticket-box">
      <header>
        <h2 class="form-ttl">
          {{ item.subject }}
        </h2>
      </header>
      <div class="theme--light v-stepper">
        <div class="v-stepper__content">
          <p class="date-t">
            {{ item.ymd }}
          </p>
          <v-form
            ref="form3"
            v-model="valid"
            lazy-validation
            @submit.prevent="purchase"
          >
            <v-container fluid>
              <v-row>
                <v-col cols="4">
                  <v-subheader>会場名</v-subheader>
                </v-col>
                <v-col cols="8">
                  {{ item.ext_col_01 }}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>対戦相手</v-subheader>
                </v-col>
                <v-col cols="8">
                  {{ item.ext_col_02 }}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>イベント概要</v-subheader>
                </v-col>
                <v-col cols="8">
                  <p class="p-label" v-html="item.ext_col_03" />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>試合詳細</v-subheader>
                </v-col>
                <v-col cols="8">
                  <p class="p-label" v-html="item.ext_col_04" />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>試合会場開場時間</v-subheader>
                </v-col>
                <v-col cols="8">
                  {{ item.ext_col_06 }}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>注意事項</v-subheader>
                </v-col>
                <v-col cols="8">
                  <p class="p-label" v-html="item.ext_col_07" />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>申込可能枚数</v-subheader>
                </v-col>
                <v-col cols="8">
                  お一人様{{ item.ext_col_08 }}枚まで
                </v-col>
              </v-row>
            </v-container>

            <v-container fluid>
              <v-container fluid>
                <v-card class="mx-auto" outlined>
                  <v-card-text>
                    <h3>購入済み・予約済みのチケット</h3>
                    <v-simple-table :fixed-header="false">
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">
                              注文番号
                            </th>
                            <th class="text-left">
                              内容
                            </th>
                            <th class="text-left">
                              QRコード
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="order in order_list"
                            :key="order.ec_order_id"
                          >
                            <td>
                              {{ order.ec_order_id }}<br />
                              [<span v-text="order_status(order.ec_payment_id,order.payment_status)" />]
                            </td>
                            <td>
                              <table>
                                <tr
                                  v-for="order_detail in order.order_details"
                                  :key="order_detail.product_id"
                                >
                                  <td class="text-left">
                                    <br />
                                    <span v-text="prodcut_nm(order_detail.product_id)" /><br />
                                    {{ order.payment_total }}円<br />
                                    {{ order_detail.quantity }}枚<br />
                                    <div v-if="prodcut_nm(order_detail.product_id).search('自由席') == -1 && order.note != 0 && order.note != null ">
                                       ゾーン {{ order.note.split('-')[0] }} / 座席 {{ order.note.split('-')[1].substring(0,3) }} <br/>
                                      <span v-for="i of order.note.split('-').length - 2" :key="i">
                                        ゾーン {{ order.note.split('-')[i].substring(3,6).replace(",","") }} / 座席 {{ order.note.split('-')[i+1].substring(0,3).replace(",","") }} <br/>
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                            <td>
                              <div v-if="order.payment_status == 450 || order.payment_status == 150 || order.payment_status == 1350">
                                <div  v-if="topics_id != 1036">
                                <tr
                                  v-for="order_detail in order.order_details"
                                  :key="order_detail.product_id"
                                > 
                                  <td
                                    v-for="index in parseInt(order_detail.quantity)"
                                    :key="index"
                                    style="display:block"
                                  >
                                    <br/>
                                    <p style="margin:0;padding:0;">
                                      <span v-text="prodcut_nm(order_detail.product_id)" /><br />
                                      <span v-if="prodcut_nm(order_detail.product_id).search('自由席') == -1 && order.note != 0 && order.note != null ">
                                        <span v-if="index == 1" >ゾーン {{ order.note.split('-')[0] }} / 座席 {{ order.note.split('-')[1].substring(0,3) }}</span> 
                                        <span v-if="index != 1">
                                          ゾーン {{ order.note.split('-')[index-1].substring(3,6).replace(",","") }} / 座席 {{ order.note.split('-')[index].substring(0,3).replace(",","") }}
                                        </span>
                                      </span>
                                    </p>
                                    <v-dialog
                                      v-for="hash_detail of hash_list"
                                      :key="hash_detail.qrcode_string"
                                      persistent
                                      max-width="1272"
                                      transition="dialog-bottom-transition"
                                    > 
                                      <template v-slot:activator="{ on, attrs }">
                                        <div v-if="order.ec_order_id == hash_detail.ec_order_id && order_detail.order_detail_id == hash_detail.order_detail_id && index == hash_detail.order_no">
                                          <div v-show="hash_detail.qrcode_type == 2 && timeFlag">
                                             &nbsp;&nbsp;&nbsp;&nbsp;
                                            <span
                                              @click="value = 3"
                                            >譲渡/分配済み</span><br/>
                                            <v-btn
                                              class="share-cancel-btn"
                                              v-bind="attrs"
                                              outlinedlargefabcolor="indigo"
                                              v-on="on"
                                              @click="value = 2"
                                            >譲渡/分配取消し</v-btn>
                                          </div>
                                          <div v-show="hash_detail.qrcode_type == 1 && timeFlag">
                                            <v-btn
                                              class="qr-code-btn"
                                              v-bind="attrs"
                                              outlinedlargefabcolor="indigo"
                                              v-on="on"
                                              @click="getQrcode1(order.ec_order_id,order_detail.order_detail_id,index), value = 4"
                                            >QRコードを表示</v-btn><br/>
                                            <v-btn
                                              class="share-btn"
                                              v-bind="attrs"
                                              outlinedlargefabcolor="indigo"
                                              v-on="on"
                                              @click="getQrcode(order.ec_order_id,order_detail.order_detail_id,index), value = 1"
                                            >譲渡/分配</v-btn>
                                          </div>
                                        </div>
                                      </template>
                                      <template v-slot:default="dialog">
                                        <v-card v-if="value == 1">
                                          <v-toolbar
                                            color="primary"
                                            dark
                                          >
                                            <v-spacer></v-spacer>
                                            <v-card-actions class="justify-end">
                                              <v-btn
                                                text
                                                @click="dialog.value = false"
                                              >
                                                閉じる
                                              </v-btn>
                                            </v-card-actions>
                                          </v-toolbar>
                                          <v-card-text style="text-align:center"><br/>
                                            <p style="text-align:center;font-weight:bold" > 譲渡 / 分配 </p> <br/>
                                            <v-card
                                            id="copyObj"
                                            v-model="message"
                                            class="align-center justify-center pa-4 mx-auto"
                                            max-width="855"
                                            min-height="76"
                                            outlined
                                            >
                                              <div style="text-align:left">
                                                <p style="text-align:left"><b> イベント名:{{ item.subject }} </b></p>
                                                <span>  券種: </span><span v-text="prodcut_nm(order_detail.product_id)"></span><br/><br/>
                                                <p style="text-align:left" v-if="prodcut_nm(order_detail.product_id).search('自由席') == -1 && order.note != 0 && order.note != null ">
                                                  <span v-if="index == 1" >座席番号:ゾーン {{ order.note.split('-')[0] }} / 座席 {{ order.note.split('-')[1].substring(0,3) }}</span> 
                                                  <span v-if="index != 1">
                                                    座席番号:ゾーン {{ order.note.split('-')[index-1].substring(3,6).replace(",","") }} / 座席 {{ order.note.split('-')[index].substring(0,3).replace(",","") }}
                                                  </span>
                                                </p>
                                                <p> 注文番号:{{ order.ec_order_id }} </p>
                                                <p>  {{ path }} </p>
                                              </div>
                                            </v-card>
                                            <v-card
                                            class="align-center justify-center pa-4 mx-auto"
                                            style="box-shadow:none"
                                            max-width="880"
                                            min-height="76"
                                            >
                                              <div style="text-align:left;font-weight:bold">
                                                <span style="text-align:left"> 【譲渡/分配に関するご注意】 </span>
                                                <p>  ※一度「譲渡/分配」されて発行されたQRコードは、「譲渡/分配 取消し」
                                                  によってURLをクリックした際にQRコードは無効化されますが、譲渡/分配され
                                                  た方が、そのQRコードを画面キャプチャなどして保存していた場合、試合会場
                                                  でゲートに入ることができてしまうため、必ず「譲渡/分配」されて送信された
                                                  QRコードの管理については購入者の責任で管理をお願いします。
                                                  （※その場合の一切の責任をチーム側で負うことは出来かねます事予めご了承
                                                  の上で「譲渡/分配」機能を実行ください）新型コロナウィルス感染防止のため、
                                                  どなたに譲渡・分配されたか確認させていただくことがございます。
                                                  譲渡・分配先の方については必ず記録される様にお願い致します。
                                                </p>
                                              </div>
                                            </v-card>
                                            <v-spacer></v-spacer>
                                            <v-card-actions class="justify-center">
                                              <v-btn
                                                class="share-transfer-btn"
                                                v-clipboard:copy="message"
                                                v-clipboard:success="onCopy"
                                                v-clipboard:error="onError"
                                                @click="update_enable(order.ec_order_id,order_detail.order_detail_id,index), Copy(), getHashDtails(), dialog.value = false"
                                                @change="getHashDtails()"
                                              >
                                                URLをコピーする
                                              </v-btn>
                                            </v-card-actions>
                                            <v-card-actions class="justify-center">
                                              <v-btn
                                                class="close-btn"
                                                text
                                                @click="dialog.value = false"
                                              >
                                                閉じる
                                              </v-btn>
                                            </v-card-actions>
                                          </v-card-text>
                                        </v-card>

                                        <v-card v-else-if="value == 2">
                                          <v-toolbar
                                            color="primary"
                                            dark
                                          >
                                            <v-spacer></v-spacer>
                                            <v-card-actions class="justify-end">
                                              <v-btn
                                                text
                                                @click="dialog.value = false"
                                              >
                                                閉じる
                                              </v-btn>
                                            </v-card-actions>
                                          </v-toolbar>
                                          <v-card-text style="text-align:center"><br/>
                                            <p style="text-align:center" > 譲渡/分配の取消しの確認 </p>
                                            <br/><br/><br/>
                                            <p style="text-align:center" > 譲渡/分配を取消しますか？ </p>
                                            <p style="text-align:center" > 取消すと、譲渡/分配済みのURLが無効になります。 </p> <br/>
                                            <v-spacer></v-spacer><br/><br/>
                                            <v-card-actions class="justify-center">
                                              <v-btn
                                                class="share-cancel-y-btn"
                                                text
                                                @click="update_disable(order.ec_order_id,order_detail.order_detail_id,index), getHashDtails(), dialog.value = false"
                                                @change="getHashDtails()"
                                              >
                                                はい
                                              </v-btn>
                                            </v-card-actions>
                                            <v-card-actions class="justify-center">
                                              <v-btn
                                                class="close-btn"
                                                text
                                                @click="dialog.value = false"
                                              >
                                                いいえ
                                              </v-btn>
                                            </v-card-actions>
                                          </v-card-text>
                                        </v-card>
                                      </template>
                                    </v-dialog>
                                  </td>
                                </tr>
                                </div>
                                  <tr v-else>
                                    <td style="display: block;">
                                      <br/>
                                      <p style="margin: 0px; padding: 0px;">
                                        <span>
                                        QRコードの表示は停止しております。入場には郵送済みのQRコードが印字されたカードをご利用ください。
                                        <br>
                                      </span>
                                    </p>
                                    </td>
                                  </tr>
                                
                              </div>
                              
                              <div v-else-if="order.payment_status == 410">
                                <div v-if="topics_id != 1036">
                                <tr
                                  v-for="order_detail in order.order_details"
                                  :key="order_detail.product_id"
                                > 
                                  <div v-if="order.order_details.length == 1">
                                    <br/><p>決済お手続き完了後に表示されます。</p>
                                  </div>
                                  <div v-else-if="order.order_details.length > 1 && order.note != null && order.note != 0">
                                    <br/><br/><p>決済お手続き完了後に表示されます。</p><br/>
                                  </div>
                                  <div v-else>
                                    <br/><br/><p>決済お手続き完了後に表示されます。</p>
                                  </div>
                                </tr>
                                </div>
                                <div v-else>
                                  <tr>
                                    <td style="display:block">
                                      <br/>
                                      <p style="margin:0;padding:0;">
                                        <span>
                                        QRコードの表示は停止しております。入場には郵送済みのQRコードが印字されたカードをご利用ください。
                                        </span>
                                    </p>
                                    </td>
                                  </tr>
                                </div>
                              </div>

                              <div v-else>
                                <tr
                                  v-for="order_detail in order.order_details"
                                  :key="order_detail.product_id"
                                > 
                                  <div v-if="order.order_details.length == 1">
                                    <br/><p>キャンセル済み。</p>
                                  </div>
                                   <div v-else-if="order.order_details.length > 1 && order.note != null && order.note != 0">
                                    <br/><br/><p>キャンセル済み。</p><br/>
                                  </div>
                                  <div v-else>
                                    <br/><br/><p>キャンセル済み。</p>
                                  </div>
                                </tr>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-card-text>
                </v-card>
              </v-container>

              <v-container v-if="topics_id != 1036" fluid>
                <v-card class="mx-auto" outlined>
                  <v-card-text>
                  <div class="center">
                  　　<v-subheader class="center-text">夢スタ　座席マップ</v-subheader>
                  </div>
                  <v-row align="center">
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <div align="center" class="resize-logo">
                        <section>
                          <img :src="zoneImg.url" :preview="zoneImg.preview" width=100%>
                        </section>
                      </div>
                      <v-btn
                        class="blank-detail-btn"
                       >
                      </v-btn>
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                      v-model="seat_num"
                    >
                      <div align="center" class="resize-logo">
                        <section>
                          <img :src="items[seat_num].url" :preview="items[seat_num].preview" width=100%>
                        </section>
                      </div>
                      <div align="center">
                        <v-btn
                          @click="seat_num = 0"
                          v-if="seat_num == 0"
                          class= "seat-detail-btn2"
                          text
                        >
                         3
                        </v-btn>
                        <v-btn
                          @click="seat_num = 0"
                          v-else
                          class= "seat-detail-btn1"
                          text
                        >
                         3
                        </v-btn>
                        <v-btn
                          @click="seat_num = 1"
                          v-if="seat_num == 1"
                          class= "seat-detail-btn2"
                          text
                        >
                         4
                        </v-btn>
                        <v-btn
                          @click="seat_num = 1"
                          v-else
                          class= "seat-detail-btn1"
                          text
                        >
                         4
                        </v-btn>
                        <v-btn
                          @click="seat_num = 2"
                          v-if="seat_num == 2"
                          class= "seat-detail-btn2"
                          text
                        >
                         5
                        </v-btn>
                        <v-btn
                          @click="seat_num = 2"
                          v-else
                          class= "seat-detail-btn1"
                          text
                        >
                         5
                        </v-btn>
                        <v-btn
                          @click="seat_num = 3"
                          v-if="seat_num == 3"
                          class= "seat-detail-btn2"
                          text
                        >
                         6
                        </v-btn>
                        <v-btn
                          @click="seat_num = 3"
                          v-else
                          class= "seat-detail-btn1"
                          text
                        >
                         6
                        </v-btn>
                        
                      </div>
                    </v-col>
                  </v-row>
                  </v-card-text>
                </v-card>
              </v-container>

              <v-container v-if="topics_id != 1036" fluid>
                <v-card class="mx-auto" outlined>
                  <v-card-text>
                    <h3>チケットの購入</h3>
                    <v-simple-table :fixed-header="false">
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">
                              席種
                            </th>
                            <th class="text-left">
                              チケット単価
                            </th>
                            <th class="text-left">
                              枚数
                            </th>
                          </tr>
                        </thead>
                        <tbody v-for="t in product_list" :key="t.product_id">
                          <template>
                            <tr>
                              <td>{{ t.subject }}</td>
                              <td>
                                <span>{{ t.price_02 }}円</span> <br/>
                                <span v-if="flag && t.group_price > 0"> 割引価格 {{ t.price_by_group.split(",")[0].split(":")[1].split("}")[0] }}円</span>
                                <span v-if="!flag && t.group_price > 0"> 割引価格 {{ t.price_by_group.split(",")[1].split(":")[1].split("}")[0] }}円</span>
                              </td>
                              <td>
                                <v-select
                                  v-if="t.stock > 0 || t.stock_unlimited == 1"
                                  v-model="order_products[t.product_id]"
                                  :items="quantity_list"
                                  menu-props="auto"
                                  label="枚数"
                                  hide-details
                                  single-line
                                  outlined
                                />
                                <!--<p></p>-->
                                <p v-if="t.stock == 0 && t.stock_unlimited == 0">
                                  完売
                                </p>
                                <!--<v-select
                                  class="p-select"
                                  label="クーポンコード"
                                  outlined
                                ></v-select>
                                <p style="margin-top: -20px;">クーポンコードをお持ちの方は入力してください。</p>-->
                              </td>
                            </tr>
                            <template v-if="order_products[t.product_id] > 0 && seat_reserved_product.has(t.class_options[19].ec_class_option_id+'')">
                              <tr style="background-color: #EEEEEE" v-for="i in order_products[t.product_id]" :key="t.product_id+''+i">
                                <td style="vertical-align:top" v-if="$vuetify.breakpoint.xs ? false : true">
                                  <div>座席選択{{i}}</div>
                                </td>
                                <td style="vertical-align:top" colspan="1">
                                  <div style="height:50%;">▼ゾーン選択</div>
                                  <div>▼座席選択</div>
                                </td>
                                <td style="vertical-align:top" colspan="2">
                                  <div>
                                    <v-select
                                      style="padding-bottom: 10px;"
                                      no-data-text=''
                                      :items="t.zone_list"
                                      v-model="t['zone'+i]"
                                      label="ゾーンを選択してください"
                                      single-line
                                      hide-details
                                      outlined
                                      @change="getSeats(t['zone'+i], t, i)"
                                    ></v-select>
                                  </div>
                                  <div>
                                    <v-select
                                      no-data-text=''
                                      ref='seatlist'
                                      :items="t['seat_list'+i]"
                                      v-model="t['seat'+i]"
                                      :rules="[rules.required]"
                                      label="座席を選択してください"
                                      single-line
                                      outlined
                                    ></v-select>
                                  </div>
                                </td>
                              </tr>
                            </template>
                          </template>
                        </tbody>
                      </template>
                    </v-simple-table>
                    <v-simple-table>
                    <br/>
                    <div style="width:50%;text-align:right;">
                      <v-text-field
                        id="serial_code"
                        v-model="serial_code"
                        label="クーポンコード入力"
                        outlined
                      />
                    </div>
                       <p style="width:50%;margin-top: -30px;">
                       クーポンコードをお持ちの方は入力してください。
                      </p>
                    </v-simple-table>
                    
                    <v-row>
                      <v-col cols="4">
                        <v-subheader>
                          <span style="color: red;">*</span>支払方法
                        </v-subheader>
                      </v-col>
                      <v-col cols="8">
                        <v-radio-group v-model="ec_payment_id">
                          <v-radio label="カード決済" value="61" />
                          <v-radio v-if="bank_flag" label="銀行振り込み" value="60" />
                        <!-- 　<v-radio label="銀行振り込み" value="60" /> -->
                        </v-radio-group>
                        <p v-if="ec_payment_id == '60'" class="body-1">
                          振込先がメールで送信されますので、そちらで振込先をご確認ください。
                        </p>
                        <p v-if="!bank_flag" class="body-1" style="margin-top: -30px;">
                          銀行振込でのお申し込みは終了しました
                        </p>
                        <div v-if="ec_payment_id == '61'" class="card-wrapper">
                          <v-text-field
                            id="cardNumber"
                            v-model="cardNumber"
                            label="クレジットカード番号"
                            outlined
                            :rules="[rules.required]"
                          />
                          <v-text-field
                            id="cardName"
                            v-model="cardName"
                            label="お名前（ローマ字）"
                            outlined
                            :rules="[rules.required]"
                          />
                          <v-row dense>
                            <v-col cols="4">
                              <v-select
                                v-model="cardMonth"
                                :items="[
                                  { value: '1', text: '1月' },
                                  { value: '2', text: '2月' },
                                  { value: '3', text: '3月' },
                                  { value: '4', text: '4月' },
                                  { value: '5', text: '5月' },
                                  { value: '6', text: '6月' },
                                  { value: '7', text: '7月' },
                                  { value: '8', text: '8月' },
                                  { value: '9', text: '9月' },
                                  { value: '10', text: '10月' },
                                  { value: '11', text: '11月' },
                                  { value: '12', text: '12月' },
                                ]"
                                menu-props="auto"
                                label="月"
                                hide-details
                                single-line
                                outlined
                                :rules="[rules.required]"
                              />
                            </v-col>
                            <v-col cols="4">
                              <v-select
                                v-model="cardYear"
                                :items="[
                                  { value: '20', text: '2020年' },
                                  { value: '21', text: '2021年' },
                                  { value: '22', text: '2022年' },
                                  { value: '23', text: '2023年' },
                                  { value: '24', text: '2024年' },
                                  { value: '25', text: '2025年' },
                                  { value: '26', text: '2026年' },
                                  { value: '27', text: '2027年' },
                                  { value: '28', text: '2028年' },
                                  { value: '29', text: '2029年' },
                                  { value: '30', text: '2030年' },
                                ]"
                                menu-props="auto"
                                label="年"
                                hide-details
                                single-line
                                outlined
                                :rules="[rules.required]"
                              />
                            </v-col>
                            <v-col cols="4">
                              <v-text-field
                                id="cardCvv"
                                v-model="cardCvv"
                                label="CVV"
                                outlined
                                :rules="[rules.required]"
                              />
                            </v-col>
                          </v-row>
                        </div>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <v-btn
                          type="submit"
                          block
                          x-large
                          color="success"
                          dark
                          :loading="loading"
                        >
                          購入する
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-container>
            </v-container>
          </v-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueQrcode from "@chenfengyuan/vue-qrcode"
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
import VueClipboard from 'vue-clipboard2'
import md5 from "js-md5"
import moment from 'moment'
VueClipboard.config.autoSetContainer = true
Vue.use(preview)
Vue.use(VueClipboard)

export default {
  auth: false,
  components: {
    VueQrcode,
    md5,
    VueClipboard,
    moment
  },
  data: () => ({
    zoneImg: {
          url: require('@/assets/images/seat_map.png'),
          preview: '1'
        },
    items: [
        {
          url: require('@/assets/images/seat_detail_3.png'),
          preview: '2'
        },
        {
          url: require('@/assets/images/seat_detail_4.png'),
          preview: '3'
        },
        {
          url: require('@/assets/images/seat_detail_5.png'),
          preview: '4'
        },
        {
          url: require('@/assets/images/seat_detail_6.png'),
          preview: '5'
        },
    ],
    message: "",
    ec_order_id_key: 1,
    order_detail_id_no: 1,
    order_detail_id: 1,
    qrcode_type: 1,
    flag: false,
    keyword: 0,
    item: [],
    seat_num: 0,
    product_list: [],
    seat_reserved_product: new Set(),
    seat_reserved_list: [],
    seat_blackAndSaved_list: [],
    order_list: [],
    hash_list: [],
    valid: true,
    can_order: false,
    success_message: "",
    topics_id: null,
    ec_payment_id: "61",
    order_products: [],
    qrcode_string: "",
    qrcode_string2: "",
    qrcode_string1: "",
    path: "",
    purchase_cnt:0,
    from_order_products:null,
    quantity_list: [{ value: "0", text: "0枚" }],
    token: "",
    rules: {
      required: (value) => !!value || "この項目は必須入力です",
      password_min: (v) => v.length >= 8 || "最低8文字以上を入力してください",
      zip_length: (v) => v.length <= 7 || "7文字の半角数字で入力してください",
      is_hankaku: (v) =>
        !!v.match(/^[ｦ-ﾟ 0-9]*$/) || "半角英数字で入力してください",
      is_card_number: (v) =>
        (v.length >= 14 && v.length <= 16) ||
        "16桁から18桁の数字で入力してください",
    },
    cardName: "",
    cardNumber: "",
    cardMonth: "",
    cardYear: "",
    cardCvv: "",
    loading: false,
    option: {
      errorCorrectionLevel: "M",
      maskPattern: 0,
      margin: 10,
      scale: 2,
      width: 300,
      color: {
        dark: "#000000FF",
        light: "#FFFFFFFF"
      }
    },
    paymentTime: "",
    time: "",
    timeFlag: "",
    todayTime: "",
    bank_flag: "",
    serial_code: "",
    payObj: {}
  }),
  mounted() {
    let self = this
    let topic_id = this.$route.params.id
    let url = "/rcms-api/1/ticket/" + topic_id
    let urlReserved = "/rcms-api/1/seat_reserved_list"
    let urlBlack = "/rcms-api/1/seat_black_list"
    let urlOrdered = "/rcms-api/1/ordered_order_note?topics_id=" + topic_id
    this.getHashDtails()
    this.$auth.ctx.$axios.get(urlBlack)
    .then(function (res) {
      let seatBlack = res.data.list
      seatBlack && seatBlack.forEach(black => {
        if (topic_id == black[0]) {
          let s = {
            topic_id: black[0],
            seat: black[1]
          }
          self.seat_blackAndSaved_list.push(s)
        }
      });
      return self.$auth.ctx.$axios.get(urlOrdered)
    })
    .then(function (res) {
      let seatOrderedData = res.data.data
      let seatOrdered
      if (seatOrderedData && seatOrderedData.topics_id == topic_id) {
        seatOrdered = seatOrderedData.ordered_order_note
      }
      seatOrdered && seatOrdered.forEach(oerdered => {
        let s = {
          topic_id: topic_id,
          seat: oerdered
        }
        self.seat_blackAndSaved_list.push(s)
      });

      return self.$auth.ctx.$axios.get(urlReserved)
    })
    .then(function (res) {
      let seatReserved = res.data.list
      seatReserved && seatReserved.forEach(reserved => {
        let s = {
          ec_class_option_id: reserved[0],
          seat: reserved[1]
        }
        self.seat_reserved_list.push(s)
        self.seat_reserved_product.add(reserved[0])
      });
      self.seat_reserved_list.shift()

      self.seat_blackAndSaved_list.forEach(blackAndSaved => {
        self.seat_reserved_list = self.seat_reserved_list.filter(reserved => {
          if (blackAndSaved.seat == reserved.seat) {
            return false   
          }
          return true
        })
      })

      self.$auth.ctx.$axios.get(url).then(function (response) {
        self.item = response.data.details
        self.ymd = response.data.details.ymd.replaceAll("-","/")
        let paymentTime = parseInt(new Date(self.ymd).getTime())
        let todayTime = new Date().getTime()
        let myDate = new Date()
        let year = myDate.getFullYear()
        let date = myDate.getDate()
        let month = myDate.getMonth() + 1
        let nowTime = parseInt(new Date(year + "/" + month + "/" + date).getTime())


        if(paymentTime - todayTime > 223200000) {
          self.bank_flag = true
        } else {
          self.bank_flag = false
        }
        self.topics_id = self.item.topics_id
        let url_p = "/rcms-api/1/product_list?topics_id=" + self.topics_id
        self.$auth.ctx.$axios.get(url_p).then(function (res_p) {
          for (const p_list of res_p.data.list) {
            if(p_list.open_flg >= 0){
              self.product_list.push(p_list)   
              p_list.zone_list = []
              for(const reserved of self.seat_reserved_list) {
                if (p_list.class_options[19].ec_class_option_id == reserved.ec_class_option_id) {
                  let zone = reserved.seat.split('-')[0]
                  let obj = {
                    text: 'ゾーン' + self.switchZoneNo(zone),
                    value: zone,
                    disabled: false,
                  }
                  p_list.zone_list.push(obj)
                }
              }
            }
          }
          if(Object.values(JSON.parse(JSON.stringify(self.$auth.user.group_ids)))[0] == "無料会員"){
            self.flag = false
          } else {
            self.flag = true
          }
          // if((nowTime - paymentTime > 0 && self.topics_id ==  1036) || (nowTime - paymentTime) <= 0){
          if(nowTime - paymentTime <= 0 && self.topics_id != 1036){
            self.timeFlag = true
          } else {
            self.timeFlag = false
          }
        })

        let url_o = "/rcms-api/1/order_list?is_canceled=0&without_payment_error=1&topics_id=" + self.topics_id
        self.$auth.ctx.$axios.get(url_o).then(function (res_o) {
          self.order_list = res_o.data.list
          for (const o_list of res_o.data.list) {
            for (const o_detail of o_list.order_details) {
              self.purchase_cnt += parseInt(o_detail.quantity)
            }
          }
          for (let i = 1; i <= parseInt(self.item.ext_col_08) - self.purchase_cnt; i++) {
            self.quantity_list.push({ value: i, text: i + "枚" })
          }
        })

      })
    })
  },
  methods: {
    async getHashDtails(){
      let self = this
      let topic_id = this.$route.params.id
      let url_o = "/rcms-api/1/order_list?is_canceled=0&without_payment_error=1&topics_id=" + topic_id
      self.$auth.ctx.$axios.get(url_o).then(function (res_o) {
        self.hash_list = res_o.data.hash_list
      })
    },
    getSeats(zone, product, index) {
      product['seat_list'+index] = []
      this.seat_reserved_list.forEach(reserved => {
        if(reserved.seat != null && reserved.seat != undefined && reserved.seat != ""){
          let reservedZone = reserved.seat.split('-')[0]
          let seat = reserved.seat.split('-')[1]
          if (reserved.ec_class_option_id == product.class_options[19].ec_class_option_id && reservedZone == zone) {
            let obj = {
                text: seat,
                value: reserved.seat,
                disabled: false,
              }
            product['seat_list'+index].push(obj)
          }
        }
      })
    },
    switchZoneNo(zoneNo) {
      switch (zoneNo) {
        case '1' : return '①'
        case '2' : return '②'
        case '3' : return '③'
        case '4' : return '④'
        case '5' : return '⑤'
        case '6' : return '⑥'
        case '7' : return '⑦'
        case '8' : return '⑧'
        case '9' : return '⑨'
        case '10' : return '⑩'
        default : return zoneNo
      }
    },
    prodcut_nm(product_id) {
      for (const p of this.product_list) {
        if(p.product_id == product_id){
        return p.subject
        }
      }
      return ""
    },
    prodcut_qr(qr_code){
      if(qr_code != null){
        let hash_code = md5(qr_code.toString())
        return hash_code
      }
      return ""
    },
    async update_disable(ec_order_id,order_detail_id,no){
      let self = this
      self.$auth.ctx.$axios
      .post("/rcms-api/1/qrcode/update", {
        ec_order_id: ec_order_id,
        order_detail_id: order_detail_id,
        no: no,
        mode: "disable"
      })
      .then(() => {
        let self = this
        let topic_id = this.$route.params.id
        let url_o = "/rcms-api/1/order_list?is_canceled=0&without_payment_error=1&topics_id=" + topic_id
        self.$auth.ctx.$axios.get(url_o).then(function (res_o) {
          self.hash_list = res_o.data.hash_list
        })
        self.$store.dispatch(
        "snackbar/setMessage",
        "分配取消成功しました。"
        )
        self.$store.dispatch("snackbar/snackOn")
      })
      .catch(function (error) {
        self.$store.dispatch(
          "snackbar/setError",
          "エラーが発生しました。再度お試しください"
        )
        self.$store.dispatch("snackbar/snackOn")
        self.loading = false
      })
    },
    async update_enable(ec_order_id,order_detail_id,no){
      let self = this
      self.$auth.ctx.$axios
      .post("/rcms-api/1/qrcode/update", {
        ec_order_id: ec_order_id,
        order_detail_id: order_detail_id,
        no: no,
        mode: "enable"
      })
      .then(() => {
        let self = this
        let topic_id = this.$route.params.id
        let url_o = "/rcms-api/1/order_list?is_canceled=0&without_payment_error=1&topics_id=" + topic_id
        self.$auth.ctx.$axios.get(url_o).then(function (res_o) {
          self.hash_list = res_o.data.hash_list
        })
        self.$store.dispatch(
        "snackbar/setMessage",
        "URLをコピーに成功しました。"
        )
        self.$store.dispatch("snackbar/snackOn")
      })
      .catch(function (error) {
        self.$store.dispatch(
          "snackbar/setError",
          "エラーが発生しました。再度お試しください"
        )
        self.$store.dispatch("snackbar/snackOn")
        self.loading = false
      })
    },
    async getQrcode(ec_order_id,order_detail_id,no){
      let self = this
      let hash = `/rcms-api/1/qrcode/url?ec_order_id=${ec_order_id}&order_detail_id=${order_detail_id}&no=${no}`
      self.$auth.ctx.$axios.get(hash).then(function (response) {
        self.qrcode_string2 = response.data.data.qrcode_string2
        self.path = window.location.origin + "/"+  "tools/qr_ticket/?" + "qrcode_string="+ self.qrcode_string2 + "&topics_id=" + self.$route.params.id;
      })
    },
    async getQrcode1(ec_order_id,order_detail_id,no){
      let self = this
      let hash = `/rcms-api/1/qrcode/url?ec_order_id=${ec_order_id}&order_detail_id=${order_detail_id}&no=${no}`
      self.$auth.ctx.$axios.get(hash).then(function (response) {
        self.qrcode_string1 = response.data.data.qrcode_string1
        self.$router.push(`/ticket/${self.$route.params.id}/qr_display/?qrcode_string=${self.qrcode_string1}`)
      })
    },

    Copy: function() {
      self = this
      let url = document.querySelector('#copyObj')
      self.message = url.textContent
    },
    onCopy: function (e) {
      self.$store.dispatch(
        "snackbar/setMessage",
        "URLをコピーに成功しました。"
      )
      self.$store.dispatch("snackbar/snackOn")
    },
    onError: function (e) {
      self.$store.dispatch(
         "snackbar/setError",
         "URLをコピーに失敗しました。"
    　)
    　self.$store.dispatch("snackbar/snackOn")
    },
    order_status(ec_payment_id,payment_status){
      let rtn = ""
      if(ec_payment_id==60){
        rtn += "銀行振り込み"
        if(payment_status == 410){
          rtn += "(予約中・未決済)"
        }else if(payment_status == 450){
          rtn += "(入金確認済み)"
        }else{
          rtn += "(キャンセル)"
        }
      }else if(ec_payment_id==61){
        rtn += "カード決済"
        if(payment_status == 150){
          rtn += "(決済完了)"
        }else if(payment_status == 9150){
          rtn += "(決済失敗)"
        }else{
          rtn += "(キャンセル)"
        }
      } else if(ec_payment_id==62) {
        rtn += "mPos連携"
        if(payment_status == 1350){
          rtn += "(決済完了)"
        }else if(payment_status == 1380){
          rtn += "(キャンセル済み)"
        }else{
          rtn += "(決済失敗)"
        }
      }
      
      return rtn
    },
    purchase() {
      this.loading = true
      let self = this
      let from_order_products = []
      let from_order_note = ''
      let order_cnt = 0
      Object.keys(self.order_products).forEach(function (key) {
        let obj = new Object()
        obj.product_id = key
        obj.quantity = self.order_products[key]
        order_cnt += parseInt(obj.quantity)
        Object.assign({}, obj)
        from_order_products.push(obj)
      })

      if (this.$refs.seatlist) {
        this.$refs.seatlist.forEach(seat => {
          if (seat.value) {
            from_order_note += seat.value + ','
          }
        })
        from_order_note = from_order_note.substr(0, from_order_note.length - 1)
      }

      if (from_order_note) {
        let arrLength = from_order_note.split(',').length
        let setLength = new Set(from_order_note.split(',')).size
        if (arrLength !== 0 && arrLength !== setLength) {
          self.$store.dispatch(
            "snackbar/setError",
            "1座席を二回以上購入しています。"
          )
          self.$store.dispatch("snackbar/snackOn")
          self.loading = false
          return
        }
      }
      
      if(self.purchase_cnt + order_cnt > parseInt(self.item.ext_col_08)){
        self.$store.dispatch(
          "snackbar/setError",
          "1試合でご購入いただける合計上限枚数を超えています。"
        )
        self.$store.dispatch("snackbar/snackOn")
        self.loading = false
        return
      }

      if (this.$refs.form3.validate()) {
        
        if (this.ec_payment_id == 61) {
          // eslint-disable-next-line no-undef
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
                if(self.serial_code != ""){
                  self.payObj = {
                    ec_payment_id: parseInt(self.ec_payment_id),
                    order_products: from_order_products,
                    card_token: response.tokenizedCardObject.token,
                    order_note: from_order_note,
                    discount: {
                      point: 0,
                      serial_code: self.serial_code
                    },
                  }
                } else {
                  self.payObj = {
                    ec_payment_id: parseInt(self.ec_payment_id),
                    order_products: from_order_products,
                    card_token: response.tokenizedCardObject.token,
                    order_note: from_order_note,
                  }
                }
                self.$auth.ctx.$axios
                  .post("/rcms-api/1/ec/purchase", self.payObj)
                  .then(() => {
                    self.$store.dispatch(
                      "snackbar/setMessage",
                      "チケットを購入いたしました。"
                    )
                    self.$store.dispatch("snackbar/snackOn")

                    self.$auth.fetchUser().then(() => {
                      self.$router.push("/")
                      self.loading = false
                    })
                  })
                  .catch(function (error) {
                    self.$store.dispatch(
                      "snackbar/setError",
                      error.response.data.errors?.[0]
                    )
                    self.$store.dispatch("snackbar/snackOn")
                    self.loading = false
                  })
              } else {
                self.$store.dispatch(
                  "snackbar/setError",
                  "カード入力内容に不備があります。再度、入力内容をご確認ください[code:" +
                    response.result +
                    "]"
                )
                self.$store.dispatch("snackbar/snackOn")
                self.loading = false
              }
            }
          )
        } else {
          if(self.serial_code != ""){
            self.payObj = {
              ec_payment_id: parseInt(self.ec_payment_id),
              order_products: from_order_products,
              order_note: from_order_note,
              discount: {
                point: 0,
                serial_code: self.serial_code
              },
            }
          } else {
            self.payObj = {
              ec_payment_id: parseInt(self.ec_payment_id),
              order_products: from_order_products,
              order_note: from_order_note,
            }
          }
          self.$auth.ctx.$axios
            .post("/rcms-api/1/ec/purchase", obj)
            .then(() => {
              self.$store.dispatch(
                "snackbar/setMessage",
                self.success_message +
                  "購入の申し込みを受け付けました。メールをご確認の上、決済手続きをお願いいたします。"
              )
              self.$store.dispatch("snackbar/snackOn")
              self.$router.push("/")
              self.loading = false
            })
            .catch(function (error) {
              self.$store.dispatch(
                "snackbar/setError",
                error.response.data.errors?.[0]
              )
              self.$store.dispatch("snackbar/snackOn")
              self.loading = false
            })
        }
      } else {
        this.loading = false
      }
    },
  },
}
</script>
<style scoped>
.col {
  white-space: pre-line;
}
.zone {
  padding: 0 !important;
}
.center{
  text-align: center;
}
.center-text{
  display: inline-block;
}
.resize-logo {
  cursor: zoom-in; 
}
.blank-detail-btn{
  background-color: white !important;
  color: white;
  height: 25px !important;
  min-width: 20px !important;
  box-shadow: none; 
  padding: 0 9px !important;
} 
.seat-detail-btn1 {
  background-color: white !important;
  border-color: #171C61 !important;
  color: rgb(12, 9, 9);
  height: 25px !important;
  min-width: 20px !important;
  box-shadow: none; 
  padding: 0 9px !important;
} 
.seat-detail-btn2 {
  background-color: #171C61 !important;
  border-color: #171C61 !important;
  color: white;
  height: 25px !important;
  min-width: 20px !important;
  box-shadow: none; 
  padding: 0 9px !important;
} 
.qr-code-btn {
  background-color: rgb(255 255 255 / 12%) !important;
  border-color: #1976d2 !important;
  border-style: solid !important;
  margin-top: 3px;
  border-width: 3px;
  box-shadow: none;
  padding: 0px 1.55px !important;
}
.share-cancel-btn {
  background-color: #FFF100 !important;
  border-color: #1976d2 !important;
  border-style: solid !important;
  margin-top: 3px;
  border-width: 3px;
  box-shadow: none;
  padding: 0px 1px !important;
}
.share-cancel-y-btn{
  background-color: #FFF100 !important;
  border-color: #1976d2 !important;
  border-style: solid !important;
  border-width: 3px;
  box-shadow: none;
  padding: 0px 60px !important;
}
.share-btn {
  background-color: #171C61 !important;
  border-color: #1976d2 !important;
  border-style: solid !important;
  border-width: 3px;
  margin-top: 10px;
  color: white;
  box-shadow: none;
  padding: 0px 23.85px !important;
}
.share-transfer-btn {
  background-color: #171C61 !important;
  border-color: #1976d2 !important;
  border-style: solid !important;
  border-width: 3px;
  color: white;
  box-shadow: none;
  padding: 0px 14px !important;
}
.close-btn{
  background-color: rgb(255 255 255 / 12%) !important;
  border-color: #1976d2 !important;
  border-style: solid !important;
  border-width: 3px;
  box-shadow: none;
  padding: 0px 53px !important;
}
.p-label{
  margin-bottom: 0px;
}
</style>