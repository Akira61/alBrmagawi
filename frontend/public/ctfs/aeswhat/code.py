from Crypto.Chiper import AES
from Crypto.Util import Counter
import os
Key = os.urandom(16)

def encrypt(plaintext):
    chiper = AES.new(KEY,AES.MOD_CTR , counter = Counter.new(128))
    chipertext = cipher.encrypt(plaintext)
    return ciphertext.hex()
test = b"hd fXhaq de efXlqqd jdlldfgqqXdl oqg dljkdfqqdX Xl qad edlgqXqjqXdl. a Xdl'q gjeedgd Xq djjjffdX qd qlAdld qq qad qXkd qaqq Xq jdjXX Ad efdldlqdX."

print(encrypt(test))

with open ('flag.txt','rb') as f:
    flag=f.read().strip()
print(encrypt(flag))